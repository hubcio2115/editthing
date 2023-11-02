import Image from "next/image";

import Navbar from "~/components/navbar";
import PremiumPricingCard from "~/components/pricing/premiumPricingCard";
import StandardPricingCard from "~/components/pricing/standardPricingCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="bg-[url('/wiggle.svg')] py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-center text-4xl font-semibold">
            Colaborate with your editors on your uploads without the stress of
            bad actors.
          </h1>

          <p className="text-center text-xl">
            A Git like colaboration platform for YouTubers and Freelance Video
            Editors.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-32 py-24">
        <div className="my-auto flex max-w-3xl flex-col gap-4">
          <h1 className="text-center text-4xl font-semibold">
            No longer you have to trade security over funcitonality and
            flexibility.
          </h1>

          <p className="text-center text-xl">
            YouTube gives too much access to the editors event at the minimal
            access rights!
          </p>
        </div>

        <div className="max-w-3xl">
          <Image
            src="/img/invite_google_modal.png"
            width={1200}
            height={1200}
            alt="youtube invite modal"
          />
        </div>
      </div>

      <div className="min-w-screen mt-10 flex justify-center gap-10 bg-[url('/wiggle.svg')] py-24 ">
        <StandardPricingCard />

        <PremiumPricingCard />
      </div>
    </div>
  );
}
