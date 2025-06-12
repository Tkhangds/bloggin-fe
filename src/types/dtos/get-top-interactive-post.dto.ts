import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GetTopInteractivePostSchema = z.object({
  title: z.string(),
  commentCount: z.number(),
  favoriteCount: z.number(),
});

export type GetTopInteractivePostDto = z.infer<
  typeof GetTopInteractivePostSchema
>;
