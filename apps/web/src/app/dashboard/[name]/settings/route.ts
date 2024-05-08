import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  redirect(`${req.nextUrl}/general`);
}
