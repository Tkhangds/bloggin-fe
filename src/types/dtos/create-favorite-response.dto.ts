import z from "zod";

export const CreateFavoriteResponseSchema = z.object({
  postId: z.string(),
  followerId: z.string(),
});

export type CreateFavoriteResponseDto = z.infer<
  typeof CreateFavoriteResponseSchema
>;
