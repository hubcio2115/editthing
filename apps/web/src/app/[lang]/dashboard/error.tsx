"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div>
      <h2>Something went wrong! :(</h2>

      <pre>{JSON.stringify(error)}</pre>

      <Link href="/">
        <Button>Go back to homepage</Button>
      </Link>
    </div>
  );
}
