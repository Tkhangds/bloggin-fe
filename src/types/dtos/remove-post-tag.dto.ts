import z from "zod";
import { CreatePostTagSchema } from "@/types/dtos/create-post-tag.dto";

export type RemovePostTagDto = z.infer<typeof CreatePostTagSchema>;
