import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  displayName: z.string(),
  isAdmin: z.boolean(),
  avatarUrl: z.string().optional(),
  specialties: z.string().optional(),
  about: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
