import z from "zod";

export const CreatePostTagSchema = z.object({
  postId: z.string(),
  tagsId: z.array(z.string()),
});

export type CreatePostTagDto = z.infer<typeof CreatePostTagSchema>;
