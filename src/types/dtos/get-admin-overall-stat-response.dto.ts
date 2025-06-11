import { z } from "zod";

const GetAdminOverallStatResponseSchema = z.object({
  usersCount: z.number(),
  postsCount: z.number(),
  tagsCount: z.number(),
  followsCount: z.number(),
  favoritesCount: z.number(),
  commentsCount: z.number(),
  interactionCount: z.number(),
});

export type GetAdminOverallStatResponseDto = z.infer<
  typeof GetAdminOverallStatResponseSchema
>;
