import { z } from "zod";

const getTopTagResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  postCount: z.number().int().nonnegative(),
});
export type GetTopTagResponseDto = z.infer<typeof getTopTagResponseSchema>;
