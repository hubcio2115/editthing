import { Check } from "lucide-react";
import { type ComponentProps } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

const featureList = [
  {
    title: "Advanced Analytics",
    description: "Get in-depth insights into your channel's performance.",
  },
  {
    title: "Priority Support",
    description: "Access premium customer support 24/7.",
  },
  {
    title: "Unlimited upload speeds",
    description: "Enjoy the fastest upload speeds possible.",
  },
] as const;

type CardProps = ComponentProps<typeof Card>;

export default function CardStandard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "relative w-[360px] border-2 border-violet-500 shadow-md shadow-fuchsia-200",
        className,
      )}
      {...props}
    >
      <div className="absolute right-0 rounded-bl-md bg-violet-500 p-1 text-xs font-semibold uppercase text-violet-100">
        recommended
      </div>

      <CardHeader>
        <CardTitle>
          <span className="font-bold text-fuchsia-900">Premium</span> Plan
        </CardTitle>

        <CardDescription>
          For large channels with even larger demands.
        </CardDescription>
      </CardHeader>

      <CardContent className="mb-10 grid gap-4">
        {featureList.map(({ title, description }) => (
          <div
            key={title}
            className="flex h-20 items-center space-x-4 rounded-md border p-4"
          >
            <Check className="text-fuchsia-700" />

            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        {/* TODO - redirect to shop */}
        <Button className="w-full bg-purple-800 hover:bg-purple-600">
          $59 USD/mo
        </Button>
      </CardFooter>
    </Card>
  );
}
