import z from "zod";

export const CreateFavoriteSchema = z.object({
  postId: z.string(),
});

export type CreateFavoriteDto = z.infer<typeof CreateFavoriteSchema>;
