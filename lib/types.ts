
export interface IBlogCount {
  user: {
    posts: {
      totalDocuments: number;
    };
  };
}

export interface PostNode {
  id: string;
  title: string;
  readTimeInMinutes: number;
  publishedAt: string;
  updatedAt: string | null;
  publication: {
    id: string;
  };
  brief: string;
  slug: string;
  tags: {
    name: string;
  }[];
  author: {
    name: string;
  };
}

export interface IBlogPostsEdge {
  node: PostNode;
}

export interface IBlogPostsResponse {
  user: {
    posts: {
      edges: IBlogPostsEdge[];
      pageInfo: {
        hasNextPage: boolean;
        nextPage: string | null;
      };
    };
  };
}

interface Seo {
  description?: string | null;
}

interface Tag {
  name: string;
}

interface CoverImage {
  url?: string | null;
}

interface Content {
  markdown?: string | null;
}

interface Author {
  name?: string | null;
}

export interface Post {
  title?: string | null;
  subtitle?: string | null;
  readTimeInMinutes?: number | null;
  brief?: string | null;
  publishedAt?: string | null;
  seo?: Seo | null;
  tags?: Tag[] | null;
  coverImage?: CoverImage | null;
  content?: Content | null;
  author?: Author | null;
  url: string;
}

interface Publication {
  post?: Post | null;
}

// interface Data {
//   publication?: Publication | null;
// }

export interface ISingleBlogResponse {
  publication?: Publication | null;
}

export interface IBlogSlugResponse {
  user?: {
    posts?: {
      edges?: {
        node?: {
          slug: string;
        };
      }[];
      pageInfo?: {
        hasNextPage: boolean;
        nextPage: number;
      };
    };
  };
}