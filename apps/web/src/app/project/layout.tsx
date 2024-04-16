import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

// import Dashnav from "~/components/dashboard/dashnav";
import Navbar from "~/components/navbar";
import { getServerAuthSession } from "~/server/auth";

export default async function ProjectLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col gap-4">
      <div className="flex flex-col items-center justify-between border-b border-slate-200 bg-slate-100 p-2">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
