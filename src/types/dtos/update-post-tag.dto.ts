import z from "zod";
import { CreatePostTagSchema } from "@/types/dtos/create-post-tag.dto";

export const UpdatePostTagSchema = CreatePostTagSchema.partial();

export type UpdatePostTagDto = z.infer<typeof UpdatePostTagSchema>;
