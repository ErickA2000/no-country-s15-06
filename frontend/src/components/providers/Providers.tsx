//Providers.tsx
"use client";
import { MembershipProvider } from "@/components/providers/MembershipContext";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        <MembershipProvider>{children}</MembershipProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};
