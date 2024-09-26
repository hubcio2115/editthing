"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "~/lib/utils";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useTranslation } from "~/app/i18n/client";
import type { SupportedLanguages } from "~/app/i18n/settings";

interface PricingPlansProps {
  lang: SupportedLanguages;
}

export default function PrincingPlans({ lang }: PricingPlansProps) {
  const { t } = useTranslation(lang, "home-page", {
    keyPrefix: "pricing_section",
  });

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans = useMemo(() => {
    const plans = [];

    for (let i = 0; i < 2; i++) {
      const plan = {
        title: t(`pricing_plans.${i}.title`),
        description: t(`pricing_plans.${i}.description`),
        price: t(`pricing_plans.${i}.price`),
        buttonText: t(`pricing_plans.${i}.buttonText`),
        features: [
          t(`pricing_plans.${i}.features.0`),
          t(`pricing_plans.${i}.features.1`),
          t(`pricing_plans.${i}.features.2`),
        ],
      };

      plans.push(plan);
    }

    return plans;
  }, [t]);

  const enterprisePlan = useMemo(
    () => ({
      title: t("pricing_plans.2.title"),
      description: t("pricing_plans.2.description"),
      price: t("pricing_plans.2.price"),
      buttonText: t("pricing_plans.2.buttonText"),
      features: [
        t("pricing_plans.2.features.0"),
        t("pricing_plans.2.features.1"),
        t("pricing_plans.2.features.2"),
      ],
    }),
    [t],
  );

  return (
    <div className="py-24">
      <div className="mx-auto mb-10 flex w-max justify-between gap-1 rounded-full border border-gray-300 p-1">
        <p
          className={cn(
            "select-none rounded-full px-2 text-sm",
            billingPeriod === "monthly"
              ? "cursor-default bg-fuchsia-800 text-white"
              : "cursor-pointer text-gray-700",
          )}
          onClick={() => setBillingPeriod("monthly")}
        >
          {t("monthly")}
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
          {t("yearly")}
        </p>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
        {plans.map(({ title, description, price, features }) => (
          <Card key={title} className="h-[400px] rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl">{title}</CardTitle>

              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <p>
                <span className="text-4xl font-bold">
                  ${billingPeriod === "monthly" ? price : +price * 10}
                </span>
                <span className="text-gray-700">
                  /{billingPeriod === "monthly" ? "month" : "year"}
                </span>
              </p>

              <Button className="w-full bg-fuchsia-700 hover:bg-fuchsia-600">
                {t("buy_plan_button")}
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
              {enterprisePlan.buttonText}
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
