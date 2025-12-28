import { z } from "zod";

export const PendingPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  userId: z.string().uuid(),
  ttl: z.number().int(),
});

export type PendingPaymentDto = z.infer<typeof PendingPaymentSchema>;