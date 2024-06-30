import {
  ArrowDown,
  Fingerprint,
  GitPullRequestArrow,
  Lock,
  RefreshCw,
} from "lucide-react";

import Navbar from "~/components/navbar";
import PricingPlans from "~/components/pricing-plans";

const features = [
  {
    name: "Merge to upload",
    description:
      "If you know what git flow is you exactly know what this tool's about. You'll get comfortable real quick.",
    icon: GitPullRequestArrow,
  },
  {
    name: "Secure",
    description:
      "You finally have a tool to manage access you your channel in a way that gives you security and doesn't restrain your flow.",
    icon: Lock,
  },
  {
    name: "Simple flow",
    description:
      "We didn't invent anything new, we took something that works and translated it to a new area.",
    icon: RefreshCw,
  },
  {
    name: "We don't track you",
    description:
      "We store as little about you as necessary, your access keys are encrypted.",
    icon: Fingerprint,
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-between border-b border-slate-200 bg-slate-100 p-2">
        <Navbar />
      </div>

      <div className="mx-auto flex gap-10">
        <div className="bg-white">
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>

            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Tool to streamline your video production pipeline
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Giving feedback, suggestions and managing your channel's
                  access don't get easier than this. Inspired by Git a tool for
                  iterating on software that actually works.
                </p>
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#deploy-faster"
                  className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more
                  <span aria-hidden="true">
                    <ArrowDown size={16} />
                  </span>
                </a>
              </div>
            </div>

            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pb-24 pt-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              id="deploy-faster"
              className="text-base font-semibold leading-7 text-fuchsia-900"
            >
              Upload faster
            </h2>

            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to upload your new video
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-900">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <PricingPlans />

      <div className="py-24 text-gray-500">
        <p className="text-center">
          &copy; 2024 Editthing, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
