import z from "zod";

export const CreatePostSchema = z.object({
  authorId: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).default([]),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
