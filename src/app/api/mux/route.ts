import Mux from "@mux/mux-node";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { z } from "zod";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { videoEntries } from "~/server/db/schema";

const muxWebhookAssetBodySchema = z.object({
  type: z.string(),
  object: z.object({
    type: z.union([z.literal("asset"), z.literal("upload")]),
    id: z.string(),
  }),
  data: z.object({
    upload_id: z.string().optional(),
    playback_ids: z.array(z.object({ id: z.string() })).optional(),
    master: z.object({ url: z.string() }).optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const signature = headers().get("mux-signature");

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    Mux.Webhooks.verifyHeader(
      JSON.stringify(await req.json()),
      signature,
      env.WEBHOOK_SECRET,
    );

    const webhookEvent = muxWebhookAssetBodySchema.safeParse(await req.json());

    if (!webhookEvent.success) {
      return new Response("Event received", { status: 200 });
    }

    if (
      webhookEvent.data.type === "video.asset.ready" &&
      webhookEvent.data.data.upload_id &&
      webhookEvent.data.data.playback_ids
    ) {
      await db
        .update(videoEntries)
        .set({
          assetId: webhookEvent.data.object.id,
          playbackId: webhookEvent.data.data.playback_ids[0]?.id,
        })
        .where(eq(videoEntries.uploadId, webhookEvent.data.data.upload_id));
    } else if (webhookEvent.data.type === "video.asset.master.ready") {
      await db
        .update(videoEntries)
        .set({ downloadUrl: webhookEvent.data.data.master?.url })
        .where(eq(videoEntries.assetId, webhookEvent.data.object.id));
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }
}
