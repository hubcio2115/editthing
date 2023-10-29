import React from "react";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
];

type CardProps = React.ComponentProps<typeof Card>;

export default function CardStandard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "relative w-[360px] border-2 border-violet-500 shadow-lg shadow-fuchsia-900",
        className,
      )}
      {...props}
    >
      <div className="absolute right-0 rounded-bl-md  bg-violet-500 p-1 font-semibold uppercase text-violet-100">
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
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="flex h-20 items-center space-x-4 rounded-md border p-4"
          >
            <Check className="text-fuchsia-700" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {feature.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
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
