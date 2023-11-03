import { type PropsWithChildren } from "react";

import Dashnav from "~/components/dashboard/dashnav";

export default function Dashboard({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Dashnav />
      {children}
    </div>
  );
}
