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
    title: "Unlimited Video Storage",
    description: "Store all your videos securely.",
  },
  {
    title: "Collaborate with Editors",
    description: "Effortlessly work with your editing team.",
  },
  {
    title: "Scheduled Video Uploads",
    description: "Automatically post videos to YouTube.",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function CardStandard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[360px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Standard Plan</CardTitle>
        <CardDescription>
          For small and medium growing channels.
        </CardDescription>
      </CardHeader>
      <CardContent className="mb-10 grid gap-4">
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="flex h-20 items-center space-x-4 rounded-md border p-4"
          >
            <Check />
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
        <Button className="w-full">$29 USD/mo</Button>
      </CardFooter>
    </Card>
  );
}
