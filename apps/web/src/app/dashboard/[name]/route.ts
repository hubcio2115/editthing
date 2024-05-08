import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { name }: { name: string }) {
  redirect(`/dashboard/${name}/overview`);
}
