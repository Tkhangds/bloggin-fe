import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GetTagDistributionResponseSchema = z.object({
  name: z.string(),
  count: z.number(),
});

export type GetTagDistributionResponseDto = z.infer<
  typeof GetTagDistributionResponseSchema
>;
