"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type PropsWithChildren } from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function SettingsMembers({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const organizationFromPathname = pathname.split("/").at(2);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between">
        <div>
          <h2 className="font-selibold text-xl">Members</h2>
          <p className="text-gray-600">
            All members and administrators with access to the{" "}
            <span className="font-semibold">{organizationFromPathname}</span>{" "}
            organization.
          </p>
        </div>
        <div className="flex items-center">
          {/* TODO: Handle form submit */}
          <Button onClick={() => {}}>invite member</Button>
        </div>
      </div>
      <div className="flex">
        <Link href="/dashboard/stasiu/settings/members">
          <div
            className={cn(
              "text-l border-b  border-transparent px-2 pl-2 capitalize last:border-r-0",
              pathname.split("/").at(-1) === "members"
                ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900"
                : "hover:border-b hover:border-slate-300",
            )}
          >
            members
          </div>
        </Link>
        <Link href="/dashboard/stasiu/settings/members/invitations">
          <div
            className={cn(
              "text-l border-b  border-transparent px-2 pl-2 capitalize last:border-r-0",
              pathname.split("/").at(-1) === "invitations"
                ? "cursor-default border-b border-b-fuchsia-900 text-fuchsia-900"
                : "hover:border-b hover:border-slate-300",
            )}
          >
            invitations
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default SettingsMembers;
