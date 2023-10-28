"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Session } from "next-auth";

interface ProfileProps {
  session: Session;
}

export default function Profile({ session }: ProfileProps) {
  return (
    <Avatar>
      <AvatarImage className="rounded-full" src={session.user.image ?? ""} alt="profile picture" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
