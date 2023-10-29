import Navbar from "~/components/navbar";
import PremiumPricingCard from "~/components/premiumPricingCard";
import StandardPricingCard from "~/components/standardPricingCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex gap-10">
        <StandardPricingCard />
        <PremiumPricingCard />
      </div>
    </div>
  );
}
