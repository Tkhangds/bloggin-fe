import z from "zod";

export const draftSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Draft = z.infer<typeof draftSchema>;
