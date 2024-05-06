"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";
import type { SessionProviderProps } from "next-auth/react";

export function SessionProvider({ children, ...props }: SessionProviderProps) {
  return <NextSessionProvider {...props}>{children}</NextSessionProvider>;
}
