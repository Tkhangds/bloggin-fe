import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FavoriteCountResponseSchema = z.object({
  postId: z.string(),
  count: z.number(),
  isFavorite: z.boolean().nullable(),
});
export type FavoriteCountResponseDto = z.infer<
  typeof FavoriteCountResponseSchema
>;
