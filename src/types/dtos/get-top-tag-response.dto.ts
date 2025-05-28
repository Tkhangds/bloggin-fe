import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getTopTagResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  postCount: z.number().int().nonnegative(),
});
export type GetTopTagResponseDto = z.infer<typeof getTopTagResponseSchema>;
