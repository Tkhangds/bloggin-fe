import z from "zod";

export const favoriteSchema = z.object({
  postId: z.string(),
  followerId: z.string(),
});

export type Favorite = z.infer<typeof favoriteSchema>;
