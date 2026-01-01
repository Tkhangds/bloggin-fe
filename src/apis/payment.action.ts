import { bloggingApi } from "@/lib/HttpClient";
import { PendingPaymentDto } from "@/types/dtos/pending-payment.dto";
import { UserPaymentDto } from "@/types/dtos/user-payment.dto";

export const paymentAction = {
  async createPendingPaymentAsync() {
    const result = await bloggingApi.post<PendingPaymentDto>("/payment");
    return result.data;
  },

  async getPendingPaymentAsync() {
    const result = await bloggingApi.get<PendingPaymentDto>("/payment/pending");
    return result.data;
  },

  async getUserPaymentAsync() {
    const result = await bloggingApi.get<UserPaymentDto>("/payment");
    return result.data;
  },
};
