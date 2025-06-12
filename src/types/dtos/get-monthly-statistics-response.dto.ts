import { z } from "zod";

const GetMonthlyStatisticsResponseSchema = z.object({
  date: z.date(),
  count: z.number(),
});

export type GetMonthlyStatisticsResponseDto = z.infer<
  typeof GetMonthlyStatisticsResponseSchema
>;
