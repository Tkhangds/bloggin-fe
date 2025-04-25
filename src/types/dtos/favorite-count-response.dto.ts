import { z } from "zod";

const FavoriteCountResponseSchema = z.object({
  postId: z.string(),
  count: z.number(),
  isFavorite: z.boolean().nullable(),
});
export type FavoriteCountResponseDto = z.infer<
  typeof FavoriteCountResponseSchema
>;
