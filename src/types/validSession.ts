import z from "zod";

export const validSessionSchema = z.object({
  valid: z.string(),
});

export type ValidSession = z.infer<typeof validSessionSchema>;
