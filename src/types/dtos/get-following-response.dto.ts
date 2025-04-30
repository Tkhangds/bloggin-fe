import { z } from "zod";

const getFollowResponseSchema = z.object({
  followerId: z.string(),
  author: z.object({
    id: z.string(),
    displayName: z.string(),
    avatarUrl: z.string().nullable(),
  }),
});

export type GetFollowResponse = z.infer<typeof getFollowResponseSchema>;
