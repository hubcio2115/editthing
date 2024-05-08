"use server";

import Mux from "@mux/mux-node";
import type { APIError } from "@mux/mux-node/error.mjs";
import type { Upload } from "@mux/mux-node/resources/video/uploads.mjs";
import type { User } from "next-auth";

import { env } from "~/env.mjs";

import { db } from "../db";
import { videoEntries } from "../db/schema";

const mux = new Mux({
  webhookSecret: env.MUX_WEBHOOK_SECRET,
});

export async function createEndpointForMuxUpload(
  userId: User["id"],
): Promise<[Upload, null] | [null, APIError]> {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: env.MUX_URL,
      new_asset_settings: {
        playback_policy: ["public"],
      },
      test: env.NODE_ENV === "development",
    });

    await db.insert(videoEntries).values({
      uploadId: upload.id,
      userId,
    });

    return [upload, null];
  } catch (e) {
    const err = e as APIError;

    console.error(`${err.status} ${err.name}: ${err.headers}`);

    return [null, err];
  }
}
