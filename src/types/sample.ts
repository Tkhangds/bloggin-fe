import z from "zod";

export const sampleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Sample = z.infer<typeof sampleSchema>;
