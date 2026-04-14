import type React from "react";
import "./globals.css";
import { Inter, Lexend  } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "5stars Football Consultancy",
  description: "The ultimate platform for grassroots football in Nigeria.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
