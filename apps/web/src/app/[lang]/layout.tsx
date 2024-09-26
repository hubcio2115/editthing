import { GeistSans } from "geist/font/sans";
import type { PropsWithChildren } from "react";
import { dir } from "i18next";

import { Toaster } from "~/components/ui/toaster";
import { ReactQueryProvider } from "~/providers/react-query-provider";
import { SessionProvider } from "~/providers/session-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { auth } from "~/server/auth";
import "~/styles/globals.css";
import { LANGUAGES, type SupportedLanguages } from "~/i18n/settings";

export async function generateStaticParams() {
  return LANGUAGES.map((lng) => ({ lng }));
}

export const metadata = {
  title: "Editthing",
  description:
    "Welcome to Editthing - your go-to platform for enhanced collaboration between editors and YouTube creators.",
};

interface RootLayoutProps extends PropsWithChildren {
  params: {
    lang: SupportedLanguages;
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const session = await auth();

  return (
    <html
      lang={params.lang}
      dir={dir(params.lang)}
      className={GeistSans.className}
      suppressHydrationWarning
    >
      <body>
        <ReactQueryProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
