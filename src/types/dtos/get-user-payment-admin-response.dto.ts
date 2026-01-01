import { z } from "zod";

export const GetUserPaymentAdminResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sepayId: z.string(),
  gateway: z.string(),
  accountNumber: z.string(),
  transactionDate: z.date(),
  code: z.string().nullable(),
  amount: z.number(),
  user: z.object({
    username: z.string(),
    email: z.string(),
  }),
});

export type GetUserPaymentAdminResponseDto = z.infer<
  typeof GetUserPaymentAdminResponseSchema
>;
