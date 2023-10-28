import Link from "next/link";

import { SignOutButton } from "~/components/authButtons";
import Profile from "~/components/profile";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-500 text-white">
      <Link href="/api/auth/signin">
        <Button>Sign in</Button>
      </Link>

      <SignOutButton />

      {session ? <Profile session={session} /> : null}
    </main>
  );
}
