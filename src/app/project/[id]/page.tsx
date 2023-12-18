import Navbar from "~/components/navbar";
import { Sheet, SheetTrigger } from "~/components/ui/sheet";
import VideoSheet from "~/components/videoSheet";

const dummyData = {
  title: "Project's title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export default function Project() {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <Navbar />
      <h1>{dummyData.title}</h1>
      <p>{dummyData.description}</p>
      <div>
        <VideoSheet />
        <Sheet>
          <SheetTrigger>Update metadata</SheetTrigger>
        </Sheet>
        <Sheet>
          <SheetTrigger>Add comment</SheetTrigger>
        </Sheet>
      </div>
    </div>
  );
}
