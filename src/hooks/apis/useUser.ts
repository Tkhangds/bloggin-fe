"use client";

import userAction from "@/apis/user.action";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
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
      mutationFn: ({ data }: { data: { displayName: string } }) => {
        return userAction.updateUser(data);
      },
      onSuccess: async () => {
        await refetchUser();
        toast.success("User updated successfully");
      },
    });
  };

  return {
    useUpdateAvatar,
    useUpdateUser,
  };
};
