import request, { gql } from "graphql-request";
import { BASE_URL, BLOGS_PER_PAGE, HASHNODE_HOST, HASHNODE_URI, HASHNODE_USERNAME } from "./constant";
import { IBlogPostsResponse, IBlogSlugResponse, ISingleBlogResponse } from "./types";

  

export const Queries ={
    getPostSlugs : gql  `
   query getPostsSlug($username: String!, $pageSize: Int!, $page: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              slug
            }
          }
          pageInfo {
            hasNextPage
            nextPage
          }
        }
      }
    }
    `,
    getSinglePost: gql`
    query getSinglePost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          readTimeInMinutes
          brief
          publishedAt
          url
          seo {
            description
          }
          tags {
            name
          }
          coverImage {
            url
          }
          content {
            markdown
          }
          author {
            name
          }
        }
      }
    }
  `,
  getPosts: gql`
  query getPosts($username: String!, $pageSize: Int!, $page: Int!) {
    user(username: $username) {
      posts(pageSize: $pageSize, page: $page) {
        edges {
          node {
            id
            title
            readTimeInMinutes
            publishedAt
            updatedAt
            publication {
              id
            }
            brief
            slug
            tags {
              name
            }
            author {
              name
            }
          }
        }
        pageInfo {
          hasNextPage
          nextPage
        }
      }
    }
  }
`,
}
class blogError extends Error {
    constructor(message: string, error: unknown) {
      super(error instanceof Error ? error.message : message);
      this.name = "blogFetchError";
    }
  }
const GQLRequest = async <T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T | undefined> => {
    try {
      return await request<T>(HASHNODE_URI, query, variables);
    } catch (error: unknown) {
      console.warn("Hashnode GraphQL API request failed (likely due to retired free access). Falling back to local posts.");
      throw new blogError("Failed to fetch data from Hashnode API", error);
    }
  };

export const getPostSlugs = async (pageSize = BLOGS_PER_PAGE, page = 1) => {
  try {
    const slugs: { slug: string }[] = [];
    let currentPage = page;
    let hasNextPage = true;

    while (hasNextPage) {
      const res = await GQLRequest<IBlogSlugResponse>(Queries.getPostSlugs, {
        username: HASHNODE_USERNAME,
        pageSize,
        page: currentPage,
      });
      const edge = res?.user?.posts?.edges ?? [];
      const nodes = edge.map((edge) => edge?.node).filter((node) => !!node);
      slugs.push(...nodes);

      hasNextPage = !!res?.user?.posts?.pageInfo?.hasNextPage;
      currentPage = res?.user?.posts?.pageInfo?.nextPage ?? currentPage + 1;
    }
    return slugs.map((s) => s.slug);
  } catch (error) {
    console.warn("Error fetching post slugs, falling back to mock slugs:", error);
    return MOCK_POSTS.map((post) => post.slug);
  }
};

export const getPosts = async (page: number, pageSize?: number) => {
  try {
    const res = await GQLRequest<IBlogPostsResponse>(Queries.getPosts, {
      username: HASHNODE_USERNAME,
      pageSize: pageSize || BLOGS_PER_PAGE,
      page: page,
    });
    return res?.user?.posts;
  } catch (error) {
    console.warn("Error fetching posts, falling back to mock posts:", error);
    const limit = pageSize || BLOGS_PER_PAGE;
    const startIndex = (page - 1) * limit;
    const paginated = MOCK_POSTS.slice(startIndex, startIndex + limit);

    return {
      edges: paginated.map((post) => ({
        node: {
          id: post.id,
          title: post.title,
          readTimeInMinutes: post.readTimeInMinutes,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          publication: post.publication,
          brief: post.brief,
          slug: post.slug,
          tags: post.tags,
          author: post.author,
        },
      })),
      pageInfo: {
        hasNextPage: startIndex + limit < MOCK_POSTS.length,
        nextPage: startIndex + limit < MOCK_POSTS.length ? String(page + 1) : null,
      },
    };
  }
};

export const getSinglePost = async (slug: string) => {
  try {
    const res = await GQLRequest<ISingleBlogResponse>(Queries.getSinglePost, {
      slug: slug,
      host: HASHNODE_HOST,
    });
    return res?.publication?.post;
  } catch (error) {
    console.warn(`Error fetching post ${slug}, falling back to mock data:`, error);
    const mock = MOCK_POSTS.find((p) => p.slug === slug);
    if (!mock) {
      return null;
    }
    return {
      title: mock.title,
      subtitle: "Technical insights and building blocks",
      readTimeInMinutes: mock.readTimeInMinutes,
      brief: mock.brief,
      publishedAt: mock.publishedAt,
      url: `${BASE_URL}/blogs/${slug}`,
      seo: {
        description: mock.brief,
      },
      tags: mock.tags,
      coverImage: {
        url: "/data/VBlog.png",
      },
      content: mock.content,
      author: mock.author,
    };
  }
};

const MOCK_POSTS = [
  {
    id: "mock-post-1",
    title: "Building High-Performance Next.js Applications",
    readTimeInMinutes: 5,
    publishedAt: "2026-06-15T00:00:00Z",
    updatedAt: null,
    publication: { id: "mock-pub-1" },
    brief: "A comprehensive guide to optimizing Next.js applications for Core Web Vitals, leveraging Server Components, streaming, and efficient client state.",
    slug: "building-high-performance-nextjs-applications",
    tags: [{ name: "Next.js" }, { name: "Web Performance" }, { name: "React" }],
    author: { name: "Ujjwal Nepal" },
    content: {
      markdown: `# Building High-Performance Next.js Applications

Optimizing Next.js application performance requires a deep understanding of React Server Components (RSC), selective hydration, and modern caching strategies. In this post, we discuss the core architectural design decisions that make websites load in milliseconds.

## 1. Leverage React Server Components

React Server Components (RSC) allow you to render components on the server, sending zero JavaScript to the client. This significantly reduces the bundle size and improves the First Input Delay (FID) and Interaction to Next Paint (INP).

\`\`\`tsx
// By default, components in Next.js app directory are Server Components
export default async function Page() {
  const data = await fetchData();
  return <DataViewer data={data} />;
}
\`\`\`

## 2. Optimize Images

Always use the next/image component. It automatically serves correctly sized images, webp formats, and lazy loads below-the-fold content.

## 3. Streaming and Suspense

Streaming allows you to break down the page's HTML into smaller chunks and progressively send them from the server to the client. Use \`<Suspense>\` to render loading fallbacks for slower parts of the page.

Stay tuned for more web performance tips!`
    }
  },
  {
    id: "mock-post-2",
    title: "Mastering Real-Time Sync with Supabase",
    readTimeInMinutes: 4,
    publishedAt: "2026-06-10T00:00:00Z",
    updatedAt: null,
    publication: { id: "mock-pub-1" },
    brief: "Learn how to leverage Supabase's real-time capabilities to build highly collaborative applications like real-time editors and chat platforms.",
    slug: "mastering-real-time-sync-with-supabase",
    tags: [{ name: "Supabase" }, { name: "PostgreSQL" }, { name: "Realtime" }],
    author: { name: "Ujjwal Nepal" },
    content: {
      markdown: `# Mastering Real-Time Sync with Supabase

Supabase makes it incredibly simple to add real-time features to your web applications by leveraging PostgreSQL's replication functionality under the hood. In this guide, we'll build a live subscription feed in Next.js.

## 1. Enable Realtime on your Table

First, make sure you check the "Enable Realtime" option on your database table in the Supabase Dashboard.

## 2. Subscribe in React

Using the Supabase JS library, you can listen to database changes in real-time:

\`\`\`typescript
const channel = supabase
  .channel('table-db-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
\`\`\`

This keeps your application state automatically synchronized with the database!`
    }
  },
  {
    id: "mock-post-3",
    title: "Clean Code Architecture: A Developer's Handbook",
    readTimeInMinutes: 6,
    publishedAt: "2026-06-01T00:00:00Z",
    updatedAt: null,
    publication: { id: "mock-pub-1" },
    brief: "An exploration of clean code patterns, modularity, and repository design to build scalable, maintainable engineering codebases.",
    slug: "clean-code-architecture-a-developers-handbook",
    tags: [{ name: "Software Architecture" }, { name: "Clean Code" }, { name: "TypeScript" }],
    author: { name: "Ujjwal Nepal" },
    content: {
      markdown: `# Clean Code Architecture: A Developer's Handbook

Scale starts with architecture. When building complex software, decoupling domain logic from UI presentation and database adapters is key to maintaining agility. In this article, we look at how to structure code repositories for growth.

## Core Principles

1. **Separation of Concerns**: Keep components focused on a single task.
2. **Dependency Inversion**: High-level modules should not import low-level modules; both should depend on abstractions.
3. **Testability**: Unit tests should be easy to write by mocking dependency layers.

By following these principles, you ensure your software remains agile, easy to debug, and ready for future integrations.`
    }
  }
];
