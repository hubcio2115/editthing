import { LogOut } from "lucide-react";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

import { SignOutButton } from "./authButtons";
import Profile from "./profile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-slate-100 p-2">
      <h1 className="text-3xl font-bold text-gray-900">
        <span className="text-fuchsia-900">Edit</span>
        thing
      </h1>

      <div>
        {session ? (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Profile session={session} />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" color="red" />
                  <SignOutButton>Log out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/dashboard/overview">
              <Button variant="outline" className="rounded-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="ghost">Sign in</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
