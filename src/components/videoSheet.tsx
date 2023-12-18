import Mux from "@mux/mux-node";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { env } from "~/env.mjs";

export default function VideoSheet() {
  async function upload(data: FormData) {
    "use server";

    const file = data.get("file") as File | null;
    if (!file) {
      console.log("Error");
      return;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const muxClient = new Mux(env.MUX_TOKEN_ID, env.MUX_TOKEN_SECRET);
    const upload = await muxClient.Video.Uploads.create({
      new_asset_settings: {
        playback_policy: "public",
      },
    });
    await fetch(upload.url, { method: "PUT", body: buffer });

    return { success: true };
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Upload video</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetHeader>Upload video</SheetHeader>
          <SheetDescription>Upload new version of video.</SheetDescription>
        </SheetHeader>
        <form action={upload}>
          <Label htmlFor="file">New version of video</Label>
          <Input type="file" name="file" accept="video/mp4" />
          <Button type="submit">Submit</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
