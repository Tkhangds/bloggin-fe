import { CreateFavoriteSchema } from "./create-favorite.dto";
import { z } from "zod";

export const RemoveFavoriteSchema = CreateFavoriteSchema;

export type RemoveFavoriteDto = z.infer<typeof CreateFavoriteSchema>;
