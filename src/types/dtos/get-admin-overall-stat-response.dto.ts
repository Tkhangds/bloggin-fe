import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
