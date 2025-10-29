import { mailingServiceAction } from "@/apis/mailing-service.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMailingService = () => {
  const useSendVerificationEmail = () => {
    return useMutation({
      mutationFn: async (email: string) => {
        return await mailingServiceAction.sendVerificationEmail(email);
      },
      onSuccess: () => {
        toast.success("Verification email sent. Please check your inbox.");
      },
      onError: (error: Error) => {
        if (error.message === "Bad Request Exception") {
          toast.error("Your account has already been verified");
        }
        if (error.message === "Conflict Exception") {
          toast.error(
            "A verification email has already been sent recently. Please check your inbox or try again later.",
          );
        }
      },
    });
  };

  return {
    useSendVerificationEmail,
  };
};
