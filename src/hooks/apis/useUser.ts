"use client";

import userAction from "@/apis/user.action";
import { useAuthContext } from "@/context/AuthContext";
import { QueryUserDto } from "@/types/dtos/query-user.dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser = () => {
  const { refetchUser } = useAuthContext();

  const useUpdateAvatar = () => {
    return useMutation({
      mutationFn: ({ data }: { data: File }) => {
        return userAction.updateAvatar(data);
      },
      onSuccess: async () => {
        await refetchUser();
        toast.success("Avatar updated successfully");
      },
    });
  };

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: ({
        data,
      }: {
        data: { displayName?: string; specialties?: string; about?: string };
      }) => {
        return userAction.updateUser(data);
      },
      onSuccess: async () => {
        await refetchUser();
        toast.success("User updated successfully");
      },
    });
  };

  const useGetUserById = (userId: string) => {
    return useQuery({
      queryKey: ["user", userId],
      queryFn: () => {
        return userAction.getUserById(userId);
      },
    });
  };

  const useGetUser = (query?: Partial<QueryUserDto>) => {
    return useQuery({
      queryKey: ["user", query],
      queryFn: () => {
        return userAction.getUser(query);
      },
    });
  };

  return {
    useUpdateAvatar,
    useUpdateUser,
    useGetUserById,
    useGetUser,
  };
};
