import { RoleEnum } from "@/enums/role.enum";
import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  displayName: z.string(),
  role: z.nativeEnum(RoleEnum),
  avatarUrl: z.string().optional(),
  specialties: z.string().optional(),
  about: z.string().optional(),
  isVerified: z.boolean().optional(),
});

export type User = z.infer<typeof userSchema>;
