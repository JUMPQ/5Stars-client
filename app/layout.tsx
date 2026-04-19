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
  openGraph: {
    title: "5stars Football Consultancy",
    description: "The ultimate platform for grassroots football in Nigeria.",
    url: "https://5starsteams.com",
    siteName: "5stars Football Consultancy",
    images: [
      {
        url: "https://5starsteams.com/5Stars.png",     // ← Change to your actual logo URL
        width: 1200,
        height: 630,
        alt: "5stars Football Consultancy Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
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
