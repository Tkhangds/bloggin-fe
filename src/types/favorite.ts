import { RoleEnum } from "@/enums/role.enum";
import z from "zod";

export const favoriteSchema = z.object({
  followerId: z.string(),
  post: z.object({
    id: z.string(),
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    commentCount: z.number(),
    tags: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
    author: z.object({
      username: z.string(),
      displayName: z.string(),
      email: z.string(),
      avatarUrl: z.string(),
      role: z.nativeEnum(RoleEnum),
    }),
  }),
});

export type Favorite = z.infer<typeof favoriteSchema>;
