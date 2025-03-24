import z from "zod";

export const commentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  postId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: z.object({
    id: z.string(),
    displayName: z.string(),
    avatarUrl: z.string(),
  }),
});

export type Comment = z.infer<typeof commentSchema>;
