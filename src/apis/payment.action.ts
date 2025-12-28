import { bloggingApi } from "@/lib/HttpClient";
import { PendingPaymentDto } from "@/types/dtos/pending-payment.dto";
import { UserPaymentDto } from "@/types/dtos/user-payment.dto";

export const PaymentAction = {
  async createPendingPaymentAsync() {
    var result = await bloggingApi.post<PendingPaymentDto>("/payment");
    return result.data;
  },

  async getPendingPaymentAsync() {
    var result = await bloggingApi.get<PendingPaymentDto>("/payment/pending");
    return result.data;
  },

  async getUserPaymentAsync() {
    var result = await bloggingApi.get<UserPaymentDto>("/payment");
    return result.data;
  },
};
