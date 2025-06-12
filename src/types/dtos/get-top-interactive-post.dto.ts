import { z } from "zod";

const GetTopInteractivePostSchema = z.object({
  title: z.string(),
  commentCount: z.number(),
  favoriteCount: z.number(),
});

export type GetTopInteractivePostDto = z.infer<
  typeof GetTopInteractivePostSchema
>;
