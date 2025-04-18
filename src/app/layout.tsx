import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdminStyles from "@/components/AdminStyles";
import { OverlayProvider } from "@/context/OverlayContext";
import { Theme } from "@radix-ui/themes";
import QueryProvider from "@/lib/queryclient";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "The Arvan",
  description:
    "Our Top Selling Products · LOOK WHITE · LIFE IS GOOD · A4 WHITE · A4 BLACK · FANCY · LOOK (SKY BLUE ) · JUNGLE WALKER · RED DRAGON.",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "The Arvan",
    description:
      "Our Top Selling Products · LOOK WHITE · LIFE IS GOOD · A4 WHITE · A4 BLACK · FANCY · LOOK (SKY BLUE ) · JUNGLE WALKER · RED DRAGON",
    url: "thearvan.com",
    siteName: "The Arvan",
    locale: "en_US",
    images: [
      {
        url: "/logo/logo.png",
        width: 800,
        height: 600,
      },
      {
        url: "/logo/logo.png",
        width: 1800,
        height: 1600,
        alt: "The Arvan",
      },
    ],
    type: "website",
  },
};

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <head>
          <meta name="color-scheme" content="dark" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preload" href="https://res.cloudinary.com/dficko9l8/image/upload/v1743685582/Mobile_wcue4b.png" as="image" type="image/png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            <Theme>
              <AdminStyles />
              <OverlayProvider>
                <CartProvider>{children}</CartProvider>
              </OverlayProvider>
            </Theme>
          </QueryProvider>
          <Providers />
        </body>
      </html>
    </SessionProvider>
  );
}
