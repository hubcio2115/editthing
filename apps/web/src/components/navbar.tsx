"use client";

import { LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import OrganizationSelect from "./organization-select";
import Profile from "./profile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const isOnDashboard = pathname.includes("/dashboard");

  const session = useSession();

  const shouldShowOrganizationsSelect =
    session.status === "authenticated" && isOnDashboard;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-fuchsia-900">Edit</span>
            thing
          </h1>

          {shouldShowOrganizationsSelect ? <OrganizationSelect /> : null}
        </div>

        <div>
          {session.status === "authenticated" ? (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Profile session={session.data} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <Link href="/user/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4 hover:cursor-pointer" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut
                      className="mr-2 h-4 w-4 hover:cursor-pointer"
                      color="red"
                    />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {!isOnDashboard && (
                <Link href="/dashboard/">
                  <Button variant="outline" className="rounded-full">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
