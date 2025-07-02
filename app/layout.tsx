import type React from "react";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Mojo Network - Launch Your Own News Portal in Minutes",
  description:
    "AI-powered, multilingual, and fully customizable news portal platform built for India's local reporters, news entrepreneurs, and digital media pioneers.",
  generator: "v0.dev",
  icons: {
    icon: "/custom-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
