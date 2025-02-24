"use client";

import { useAccount } from "@starknet-react/core";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();

  const { address } = useAccount();

  useEffect(() => {
    // Set loading to false when auth state is determined

    if (!address) {
      router.push("/login");
    } else if (pathName === "/login") {
      router.push("/");
    }
  }, [router, address]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
