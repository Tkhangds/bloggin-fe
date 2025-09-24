import { postSchema } from "../post";
import { userSchema } from "../user";
import { tagSchema } from "../tag";
import { z } from "zod";

export const searchResultSchema = z.object({
  Posts: z.array(postSchema),
  Authors: z.array(userSchema),
  Tags: z.array(tagSchema),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
