import Mux, { type Asset } from "@mux/mux-node";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { videoEntries } from "~/server/db/schema";

type MuxWebhookAssetBody = {
  type: string;
  object: {
    type: "asset";
    id: string;
  };
  data: Asset;
};

export async function POST(req: NextRequest) {
  try {
    const signature = headers().get("mux-signature");

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const body = (await req.json()) as MuxWebhookAssetBody;

    Mux.Webhooks.verifyHeader(
      JSON.stringify(body),
      signature,
      env.WEBHOOK_SECRET,
    );

    if (body.type === "video.asset.ready" && body.data.upload_id) {
      await db
        .update(videoEntries)
        .set({ assetId: body.object.id })
        .where(eq(videoEntries.uploadId, body.data.upload_id));
    } else if (body.type === "video.asset.master.ready") {
      await db
        .update(videoEntries)
        .set({ downloadUrl: body.data.master?.url })
        .where(eq(videoEntries.assetId, body.object.id));
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }
}
