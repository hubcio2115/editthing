"use client";

import MuxUploader, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
} from "@mux/mux-uploader-react";
import { VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { createEndpointForMuxUpload } from "~/server/actions/mux";

export default function CreateProjectPage() {
  const session = useSession();

  async function endpointHandler() {
    const [upload, err] = await createEndpointForMuxUpload(
      session.data!.user.id,
    );

    if (err !== null) {
      console.error(err.message);
      return "";
    }

    return upload.url;
  }

  return (
    <div className="container max-w-[800px] flex-1">
      <MuxUploader
        id="uploader"
        className="hidden"
        endpoint={endpointHandler}
      />

      <MuxUploaderDrop
        id="uploader"
        className="mt-2 flex justify-center gap-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        overlay
        overlayText="Let it go"
      >
        <span slot="heading" className="text-xl text-slate-600">
          <VideoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          Drag and drop video file to upload
        </span>

        <span slot="separator" className="text-sm italic text-slate-400">
          - or -
        </span>

        <MuxUploaderFileSelect muxUploader="uploader">
          <Button>Select file</Button>
        </MuxUploaderFileSelect>
      </MuxUploaderDrop>

      <MuxUploaderProgress
        type="bar"
        muxUploader="uploader"
        className="text-orange-600"
      />
    </div>
  );
}
