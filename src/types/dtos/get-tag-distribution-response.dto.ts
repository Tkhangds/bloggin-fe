import { z } from "zod";

const GetTagDistributionResponseSchema = z.object({
  name: z.string(),
  count: z.number(),
});

export type GetTagDistributionResponseDto = z.infer<
  typeof GetTagDistributionResponseSchema
>;
