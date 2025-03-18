import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  displayName: z.string(),
  isAdmin: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
