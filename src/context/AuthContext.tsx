"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/user";
import { useAuth } from "@/hooks/apis/useAuth";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { mutateAsync: logoutFunction } = useAuth().useLogout();
  const { mutateAsync: getMeFunction } = useAuth().useGetMe();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMeFunction();

        setUser(res);
      } catch (err) {
    console.error("Failed to fetch user data:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutFunction();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const refetchUser = async () => {
    setLoading(true);
    try {
      const res = await getMeFunction();
      setUser(res);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
