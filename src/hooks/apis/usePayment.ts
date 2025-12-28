"use client";
import { PaymentAction } from "@/apis/payment.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePayment = () => {
  const queryClient = useQueryClient();
  const getPendingPayment = () => {
    return useQuery({
      queryKey: ["payment", "pending"],
      queryFn: () => {
        return PaymentAction.getPendingPaymentAsync();
      },
      staleTime: 0,
      refetchOnMount: "always",
    });
  };

  const createPendingPayment = () => {
    return useMutation({
      mutationFn: () => {
        return PaymentAction.createPendingPaymentAsync();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payment", "pending"] });
      },
    });
  };

  const getUserPayment = () => {
    return useQuery({
      queryKey: ["payment", "me"],
      queryFn: () => {
        return PaymentAction.getUserPaymentAsync();
      },
      staleTime: 0,
      refetchOnMount: "always",
    });
  };

  return { getPendingPayment, createPendingPayment, getUserPayment };
};
