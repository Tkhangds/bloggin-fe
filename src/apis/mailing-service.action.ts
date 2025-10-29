import { bloggingApi } from "@/lib/HttpClient";

export const mailingServiceAction = {
  async sendVerificationEmail(email: string) {
    await bloggingApi.post<SuccessResponseWrapper<null>>(
      "mail/resend-verification",
      { email: email },
    );
  },
};
