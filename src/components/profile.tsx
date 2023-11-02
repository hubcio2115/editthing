"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Session } from "next-auth";

interface ProfileProps {
  session: Session | null;
}

function getInitials(name: string) {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return `${firstName?.at(0)}${lastName?.at(0)}`;
}

export default function Profile({ session }: ProfileProps) {
  return (
    <Avatar>
      <AvatarImage
        src={session?.user.image ?? undefined}
        className="h-10 w-10 rounded-full"
        alt="profile picture"
      />
      <AvatarFallback>
        {session?.user.name ? getInitials(session.user.name) : ""}
      </AvatarFallback>
    </Avatar>
  );
}
