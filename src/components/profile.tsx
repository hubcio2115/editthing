"use client";

import type { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface ProfileProps {
  session: Session | null;
}

function getInitials(name: string) {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  // If username is somehow all blank
  if (!firstName && !lastName) return "You";

  return `${firstName?.at(0) ?? ""}${lastName?.at(0) ?? ""}`;
}

export default function Profile({ session }: ProfileProps) {
  return (
    <Avatar>
      <AvatarImage
        src={session?.user.image ?? undefined}
        alt="profile picture"
      />
      <AvatarFallback>
        {session?.user.name ? getInitials(session.user.name) : ""}
      </AvatarFallback>
    </Avatar>
  );
}
