import z from "zod";

export const followSchema = z.object({
  authorId: z.string(),
  followerId: z.string(),
});

export type Follow = z.infer<typeof followSchema>;
