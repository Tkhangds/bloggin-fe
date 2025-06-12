import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GetMonthlyStatisticsResponseSchema = z.object({
  date: z.date(),
  count: z.number(),
});

export type GetMonthlyStatisticsResponseDto = z.infer<
  typeof GetMonthlyStatisticsResponseSchema
>;
