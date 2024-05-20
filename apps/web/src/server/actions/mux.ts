"use server";

import Mux from "@mux/mux-node";
import type { APIError } from "@mux/mux-node/error.mjs";
import type { Upload } from "@mux/mux-node/resources/video/uploads.mjs";

import { env } from "~/env.mjs";
import type { Result } from "~/lib/utils";

const mux = new Mux({
  webhookSecret: env.MUX_WEBHOOK_SECRET,
});

export async function createEndpointForMuxUpload(): Promise<Result<Upload>> {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: env.MUX_URL,
      new_asset_settings: {
        playback_policy: ["public"],
      },
      test: env.NODE_ENV === "development",
    });

    return [upload, null];
  } catch (e) {
    const err = e as APIError;

    console.error(`${err.status} ${err.name}: ${err.headers}`);

    return [null, err.message];
  }
}
