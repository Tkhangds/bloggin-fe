import z from "zod";

export const CreateDraftSchema = z.object({
  authorId: z.string(),
  title: z.string(),
  content: z.string(),
});

export type CreateDraftDto = z.infer<typeof CreateDraftSchema>;
