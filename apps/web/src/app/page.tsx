import Navbar from "~/components/navbar";
import PremiumPricingCard from "~/components/pricing/premiumPricingCard";
import StandardPricingCard from "~/components/pricing/standardPricingCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <div className="flex flex-col items-center justify-between border-b border-slate-200 bg-slate-100 p-2">
        <Navbar />
      </div>

      <div className="mx-auto flex gap-10">
        <StandardPricingCard />
        <PremiumPricingCard />
      </div>
    </div>
  );
}
