"use client";

import { signOut } from "next-auth/react";
import { type PropsWithChildren } from "react";

// NOTE: This might not be necessary anymore, it's marked for deletion
export function SignOutButton({ children }: PropsWithChildren) {
  return <span onClick={() => signOut()}>{children}</span>;
}
