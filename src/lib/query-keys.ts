/**
 * Centralised registry of all TanStack Query keys.
 *
 * Usage:
 *   import { QUERY_KEYS } from "@/lib/query-keys";
 *   useQuery({ queryKey: QUERY_KEYS.post.byId(id), ... })
 *
 * Keeping keys here prevents typos and makes global invalidations trivial.
 */
export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },

  post: {
    all: (tagName?: string, title?: string, limit?: number) =>
      ["posts", tagName, title, limit] as const,
    byId: (id: string) => ["post", id] as const,
    byAuthor: (authorId: string) => ["post", "author", authorId] as const,
  },

  draft: {
    byAuthor: (authorId: string) => ["draft", authorId] as const,
  },

  comment: {
    byPost: (postId: string) => ["comments", postId] as const,
  },

  favorite: {
    count: ["favCount"] as const,
    list: ["favorite"] as const,
  },

  follow: {
    follower: (userId?: string) => ["follower", userId] as const,
    following: (userId?: string) => ["following", userId] as const,
  },

  tag: {
    all: ["tags"] as const,
  },

  search: {
    results: (query: string) => ["search", query] as const,
  },

  admin: {
    statistics: {
      topFollowedUser: ["statistics", "top-followed-user"] as const,
      topTag: (top?: number) => ["statistics", "top-tag", top] as const,
      overall: ["statistics", "overall"] as const,
      registration: ["statistics", "registration"] as const,
      postUpload: ["statistics", "post-upload"] as const,
      tagDistribution: ["statistics", "tag-distribution"] as const,
      topInteractivePost: ["statistics", "top-interactive-post"] as const,
    },
    posts: (status: string) => ["admin", "posts", status] as const,
    userPayments: ["admin", "user-payments"] as const,
  },

  user: {
    byId: (id: string) => ["user", id] as const,
  },

  payment: {
    pending: ["payment", "pending"] as const,
    user: ["payment", "user"] as const,
  },
} as const;
