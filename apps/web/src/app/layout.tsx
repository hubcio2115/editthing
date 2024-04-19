import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";
import type { PropsWithChildren } from "react";

import { Toaster } from "~/components/ui/toaster";
import { SessionProvider } from "~/context/session-provider";
import { ThemeProvider } from "~/context/theme-provider";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Editthing",
  description:
    "Welcome to Editthing - your go-to platform for enhanced collaboration between editors and YouTube creators.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <TRPCReactProvider headers={headers()}>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
