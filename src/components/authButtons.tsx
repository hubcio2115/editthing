"use client";

import { signOut } from "next-auth/react";
import { type PropsWithChildren } from "react";

export function SignOutButton({ children }: PropsWithChildren) {
  return <span onClick={() => signOut()}>{children}</span>;
}
