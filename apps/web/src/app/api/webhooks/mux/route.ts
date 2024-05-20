import Mux from "@mux/mux-node";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { videoEntries } from "~/server/db/schema";

const mux = new Mux({
  webhookSecret: env.MUX_WEBHOOK_SECRET,
});

export async function POST(req: NextRequest) {
  const headersList = headers();
  const body = await req.text();

  try {
    const event = mux.webhooks.unwrap(body, headersList);

    switch (event.type) {
      case "video.asset.ready":
        await db
          .update(videoEntries)
          .set({
            assetId: event.object.id,
            playbackId: event.data.playback_ids?.at(0)?.id,
          })
          .where(eq(videoEntries.uploadId, event.data.upload_id ?? ""));
        break;

      case "video.asset.master.ready":
        await db
          .update(videoEntries)
          .set({ downloadUrl: event.data.master?.url })
          .where(eq(videoEntries.assetId, event.data.id));
        break;

      case "video.asset.errored":
      case "video.asset.master.errored":
        const error = event.data.errors;

        console.error(`Asset Error: ${error?.type}, ${error?.messages}`);
        break;

      default:
        return Response.json(
          { message: "Event received but is not supported by us." },
          { status: 200 },
        );
    }

    return Response.json({ message: "Event received" }, { status: 200 });
  } catch (err) {
    console.error("Error: Missing mux signature.", err);
    return new Response((err as Error).message, { status: 401 });
  }
}
