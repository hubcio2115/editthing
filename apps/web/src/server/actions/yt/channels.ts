"use server";

import { getServerAuthSession } from "~/server/auth";
import { youtube } from "@googleapis/youtube";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { accounts } from "~/server/db/schema";
import { OAuth2Client } from "google-auth-library";
import { env } from "~/env.mjs";
import type { Result } from "~/lib/utils";
import { redirect } from "next/navigation";
import { Readable } from "node:stream";

const youtubeClient = youtube("v3");

type Channel = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    localized: {
      title: string;
      description: string;
    };
  };
};

export async function getUserChannels(): Promise<Result<Channel[]>> {
  const session = await getServerAuthSession();

  if (!session) return redirect("/");

  const serverSession = await db.query.accounts.findFirst({
    where: eq(accounts.userId, session.user.id),
  });

  const oauthClient = new OAuth2Client({
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    clientId: env.GOOGLE_CLIENT_ID,

    credentials: {
      access_token: serverSession?.access_token,
      refresh_token: serverSession?.refresh_token,
    },
  });

  const channels = await youtubeClient.channels
    .list({
      part: "snippet",
      auth: oauthClient,
      mine: true,
      key: env.YOUTUBE_DATA_API_KEY,
    })
    .then((res) => res.data.items);

  return [channels, null];
}

export async function uploadAnExampleVideo() {
  const session = await getServerAuthSession();

  if (!session) return redirect("/");

  const serverSession = await db.query.accounts.findFirst({
    where: eq(accounts.userId, session.user.id),
  });

  const oauthClient = new OAuth2Client({
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    clientId: env.GOOGLE_CLIENT_ID,

    credentials: {
      access_token: serverSession?.access_token,
      refresh_token: serverSession?.refresh_token,
      id_token: serverSession?.id_token,
      scope: serverSession?.scope!,
      token_type: serverSession?.token_type,
      expiry_date: serverSession?.expires_at,
    },
  });

  const res = await fetch(
    "https://storage.googleapis.com/muxdemofiles/mux.mp4",
  );

  const video = await res.blob();

  try {
    const res = await youtubeClient.videos.insert({
      auth: oauthClient,
      key: env.YOUTUBE_DATA_API_KEY,
      media: {
        body: Readable.from(video.stream()),
        mimeType: "video/*",
      },
      part: [],
      requestBody: {
        // snippet: {
        //   title: "test api video",
        //   description: "",
        //   categoryId: 22,
        // },
      },
    });
  } catch (e) {
    console.error(e);
  }
}
