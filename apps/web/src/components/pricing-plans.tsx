"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/utils";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const plans = [
  {
    title: "Small channel",
    description:
      "The essentials for running a small or an up and comming channel.",
    price: 50,
    buttonText: "Buy plan",
    features: ["Full access to our tools", "You + 2 seats", "Up to 1 channel"],
  },

  {
    title: "Small network of channels",
    description: "Everything you need to manage small organization.",
    price: 250,
    buttonText: "Buy plan",
    features: [
      "Everything in Small channel plan",
      "You + 10 seats",
      "Up to 3 channels",
    ],
  },
];

const enterprisePlan = {
  title: "Enterprise",
  description: "A plan tailored to the exact needs of your company.",
  price: "Custom",
  buttonText: "Contact sales",
  features: [
    "Everything in Small network of channels",
    "You + any number of seats you'd like",
    "You specify the number of channels",
  ],
};

export default function PrincingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="py-24">
      <div className="mx-auto mb-10 flex w-[140px] justify-between gap-1 rounded-full border border-gray-300 p-1">
        <p
          className={cn(
            "select-none rounded-full px-2 text-sm",
            billingPeriod === "monthly"
              ? "cursor-default bg-fuchsia-800 text-white"
              : "cursor-pointer text-gray-700",
          )}
          onClick={() => setBillingPeriod("monthly")}
        >
          Monthly
        </p>

        <p
          className={cn(
            "select-none rounded-full px-2 text-sm",
            billingPeriod === "yearly"
              ? "cursor-default bg-fuchsia-800 text-white"
              : "cursor-pointer text-gray-700",
          )}
          onClick={() => setBillingPeriod("yearly")}
        >
          Yearly
        </p>
      </div>

      <div className="container grid grid-cols-3 gap-10">
        {plans.map(({ title, description, price, features }) => (
          <Card key={title} className="h-[400px] rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>

              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <p>
                <span className="text-4xl font-bold">
                  ${billingPeriod === "monthly" ? price : price * 10}
                </span>
                <span className="text-gray-700">
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </p>

              <Button className="w-full bg-fuchsia-700 hover:bg-fuchsia-600">
                Buy plan
              </Button>

              <ul className="flex flex-col gap-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-1">
                    <Check size={18} className="text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card className="h-[400px] rounded-3xl border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              {enterprisePlan.title}
            </CardTitle>

            <CardDescription className="text-gray-100">
              {enterprisePlan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <p className="text-4xl font-bold text-white">
              {enterprisePlan.price}
            </p>

            <Button className="w-full" variant="secondary">
              Buy plan
            </Button>

            <ul className="flex flex-col gap-1">
              {enterprisePlan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-1 text-gray-200"
                >
                  <Check size={18} className="text-white" />

                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
