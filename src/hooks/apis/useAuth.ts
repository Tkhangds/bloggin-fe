"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAction from "@/apis/auth.action";
import { LoginDto } from "@/types/dtos/login.dto";
import { useRouter } from "next/navigation";
import { RegisterDto } from "@/types/dtos/register.dto";
import { useAuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { refetchUser } = useAuthContext();
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/";

  const useLogin = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: LoginDto }) => {
        return await authAction.login(data);
      },
      onSuccess: async () => {
        // Fix this later
        queryClient.invalidateQueries({ queryKey: ["login"] });
        await refetchUser();
        router.replace("/");
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

  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        return await authAction.logout();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["logout"] });
        router.push("/");
      },
    });
  };

  const useGetMe = () => {
    return useMutation({
      mutationFn: async () => {
        return await authAction.getMe();
      },
    });
  };

  return {
    queryClient,
    useLogin,
    useRegister,
    useLogout,
    useGetMe,
  };
};
