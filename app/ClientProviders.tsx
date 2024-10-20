"use client";

import { SessionProvider } from "next-auth/react";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProviders;
