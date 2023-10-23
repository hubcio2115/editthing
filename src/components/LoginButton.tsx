"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "./ui/button";

export function LoginButton() {
  return <Button onClick={() => void signIn("google")}>Sign in</Button>;
}

export function SignOutButton() {
  return <Button onClick={() => void signOut()}>Sign out</Button>;
}
