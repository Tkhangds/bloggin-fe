import z from "zod";

export const LoginSchema = z.object({
  identifier: z.string().nonempty("Identifier is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
