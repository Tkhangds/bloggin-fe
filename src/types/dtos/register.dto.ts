import z from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  displayName: z.string().default(""),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
