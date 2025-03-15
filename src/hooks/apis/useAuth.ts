"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAction from "@/apis/auth.action";
import { LoginDto } from "@/types/dtos/login.dto";
import { useRouter } from "next/navigation";
import { RegisterDto } from "@/types/dtos/register.dto";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const useLogin = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: LoginDto }) => {
        return await authAction.login(data);
      },
      onSuccess: () => {
        // Fix this later
        queryClient.invalidateQueries({ queryKey: ["login"] });
        router.push("/");
      },
    });
  };

  const useRegister = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: RegisterDto }) => {
        return await authAction.register(data);
      },
      onSuccess: () => {
        // Fix this later
        queryClient.invalidateQueries({ queryKey: ["register"] });
        router.push("/");
      },
    });
  };

  return {
    queryClient,
    useLogin,
    useRegister,
  };
};
