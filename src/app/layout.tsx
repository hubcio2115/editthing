import { GeistSans } from "geist/font";
import { headers } from "next/headers";
import type { PropsWithChildren } from "react";

import { ThemeProvider } from "~/context/theme-provider";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Editthing",
  description:
    "Welcome to Editthing - your go-to platform for enhanced collaboration between editors and YouTube creators.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
