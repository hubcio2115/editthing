import VideoList from "~/components/dashboard/videoList";

export default async function Overview() {
  return (
    <div className="mx-10 flex justify-center">
      <VideoList />
    </div>
  );
}
