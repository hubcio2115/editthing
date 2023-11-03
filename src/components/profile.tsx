"use client";

import type { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface ProfileProps {
  session: Session;
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
        // eslint-disable-next-line
        src={session.user.image!}
        alt="profile picture"
      />
      <AvatarFallback className="bg-white transition-colors hover:bg-accent hover:text-accent-foreground">
        {session.user.name ? getInitials(session.user.name) : ""}
      </AvatarFallback>
    </Avatar>
  );
}
