import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFollowResponseSchema = z.object({
  followerId: z.string(),
  author: z.object({
    id: z.string(),
    displayName: z.string(),
    avatarUrl: z.string().nullable(),
  }),
});

export type GetFollowResponse = z.infer<typeof getFollowResponseSchema>;
