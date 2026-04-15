"use client";

import { createContext, useContext } from "react";
import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authAction from "@/apis/auth.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  refetchUser: async () => {},
});

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user = null,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authAction.getMe(),
    retry: false,
  });

  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: () => authAction.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["favCount"] });
      queryClient.removeQueries({ queryKey: ["favorite"] });
      queryClient.removeQueries({ queryKey: ["statistics", "top-followed-user"] });
      queryClient.removeQueries({ queryKey: ["statistics", "top-tag"] });
      queryClient.removeQueries({ queryKey: ["following"] });
      toast.success("Logout successfully");
      router.push("/");
    },
  });

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const refetchUser = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
