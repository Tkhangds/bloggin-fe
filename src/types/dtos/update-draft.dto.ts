import z from "zod";
import { CreateDraftSchema } from "@/types/dtos/create-draft.dto";

export const UpdateDraftSchema = CreateDraftSchema.partial();

export type UpdateDraftDto = z.infer<typeof UpdateDraftSchema>;
