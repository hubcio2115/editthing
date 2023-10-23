import { LoginButton, SignOutButton } from "~/components/LoginButton";
import Profile from "~/components/Profile";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-500 text-white">
      <LoginButton />

      <SignOutButton />

      {session ? <Profile session={session} /> : null}
    </main>
  );
}
