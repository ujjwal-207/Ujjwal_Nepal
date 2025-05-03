import request, { gql } from "graphql-request";
import { BLOGS_PER_PAGE, HASHNODE_HOST, HASHNODE_URI, HASHNODE_USERNAME } from "./constant";
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
      console.error("Error fetching data:", error);
      throw new blogError("Failed to fetch data from Hashnode API", error);
    }
  };

export const getPostSlugs = async (pageSize = BLOGS_PER_PAGE, page = 1) => {
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
  };
  export const getPosts = async (page: number, pageSize?: number) => {
    const res = await GQLRequest<IBlogPostsResponse>(Queries.getPosts, {
      username: HASHNODE_USERNAME,
      pageSize: pageSize || BLOGS_PER_PAGE,
      page: page,
    });
    return res?.user?.posts;
  };
  
  export const getSinglePost = async (slug: string) => {
    const res = await GQLRequest<ISingleBlogResponse>(Queries.getSinglePost, {
      slug: slug,
      host: HASHNODE_HOST,
    });
    return res?.publication?.post;
  };