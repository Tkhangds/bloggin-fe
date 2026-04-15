"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authAction from "@/apis/auth.action";
import { LoginDto } from "@/types/dtos/login.dto";
import { useRouter } from "next/navigation";
import { RegisterDto } from "@/types/dtos/register.dto";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { refetchUser } = useAuthContext();

  const useLogin = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: LoginDto }) => {
        return await authAction.login(data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["favCount"] });
        queryClient.invalidateQueries({ queryKey: ["favorite"] });
        queryClient.invalidateQueries({
          queryKey: ["statistics", "top-followed-user"],
        });
        queryClient.invalidateQueries({ queryKey: ["statistics", "top-tag"] });

        await refetchUser();
        toast.success("Login successfully");
        router.replace("/");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const useRegister = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: RegisterDto }) => {
        return await authAction.register(data);
      },
      onSuccess: () => {
        toast.success("Register successfully");
        router.push("/sign-in");
      },
    });
  };

  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        return await authAction.logout();
      },
    });
  };

  const useGetMe = () => {
    return useQuery({
      queryKey: ["auth", "me"],
      queryFn: () => authAction.getMe(),
      retry: false,
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
