import { z } from "zod";

export const UserPaymentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sepayId: z.string(),
  gateway: z.string(),
  accountNumber: z.string(),
  transactionDate: z.string(),
  code: z.string().nullable(),
  amount: z.number(),
});

export type UserPaymentDto = z.infer<typeof UserPaymentSchema>;
