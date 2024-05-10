import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";

import { Toaster } from "~/components/ui/toaster";
import { ReactQueryProvider } from "~/providers/react-query-provider";
import { SessionProvider } from "~/providers/session-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";

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
        <ReactQueryProvider>
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
        </ReactQueryProvider>
      </body>
    </html>
  );
}
