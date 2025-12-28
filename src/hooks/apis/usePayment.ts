"use client";
import { paymentAction } from "@/apis/payment.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePayment = () => {
  const queryClient = useQueryClient();

  const useGetPendingPayment = () => {
    return useQuery({
      queryKey: ["payment", "pending"],
      queryFn: () => {
        return paymentAction.getPendingPaymentAsync();
      },
      staleTime: 0,
      refetchOnMount: "always",
    });
  };

  const useCreatePendingPayment = () => {
    return useMutation({
      mutationFn: () => {
        return paymentAction.createPendingPaymentAsync();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["payment", "pending"] });
      },
    });
  };

  const useGetUserPayment = () => {
    return useQuery({
      queryKey: ["payment", "me"],
      queryFn: () => {
        return paymentAction.getUserPaymentAsync();
      },
      staleTime: 0,
      refetchOnMount: "always",
    });
  };

  return {
    useGetPendingPayment,
    useCreatePendingPayment,
    useGetUserPayment,
  };
};
