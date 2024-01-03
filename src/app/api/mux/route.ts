import Mux, { type Asset } from "@mux/mux-node";
import { headers } from "next/headers";

import { env } from "~/env.mjs";

interface MuxWebhookAssetBody {
  type: string;
  object: {
    type: "asset";
    id: string;
  };
  data: Asset;
}

export async function POST(req: Request) {
  try {
    const signature = headers().get("mux-signature");

    const reader = req.body?.getReader();
    const body = await reader?.read();
    const buffer = body?.value as Buffer;

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const isValidSignature = Mux.Webhooks.verifyHeader(
      buffer,
      signature,
      env.WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Bad signature", { status: 400 });
    }

    const jsonFormattedBody = JSON.parse(
      buffer.toString(),
    ) as MuxWebhookAssetBody;

    if (jsonFormattedBody.type === "video.asset.ready") {
      console.log("Received 'video.asset.ready' event.");
      // save asset id to video entry in db
    }

    if (jsonFormattedBody.type === "video.asset.master.ready") {
      console.log("Received 'video.asset.master.ready' event.");
      // save url to video in db
    }

    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }
}
