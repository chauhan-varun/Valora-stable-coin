import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeInitScript } from "./theme-script";

import '@rainbow-me/rainbowkit/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Valora Stablecoin | Decentralized Crypto-Backed Stablecoin Platform",
  description: "Valora is a fully decentralized, overcollateralized stablecoin platform that allows you to mint, redeem, and liquidate positions with multiple collateral types. Earn yield on your crypto assets while maintaining price stability in volatile markets.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/logo.png'
  },
  keywords: [
    "stablecoin", 
    "cryptocurrency", 
    "defi", 
    "valora", 
    "decentralized finance", 
    "crypto-backed stablecoin", 
    "overcollateralized", 
    "crypto yield", 
    "ethereum", 
    "defi protocol",
    "mint stablecoins",
    "digital assets",
    "liquidity provider",
    "collateral management"
  ],
  authors: [{ name: "Valora Protocol", url: "https://valora-stablecoin.vercel.app" }],
  creator: "Valora Protocol Team",
  publisher: "Valora Protocol",
  metadataBase: new URL("https://valora-stablecoin.vercel.app"),
  openGraph: {
    title: "Valora Stablecoin | Decentralized Crypto-Backed Stablecoin Platform",
    description: "Mint, redeem, and manage crypto-backed stablecoin positions with Valora's decentralized protocol. Multiple collateral types supported with real-time health factor monitoring.",
    images: ['/logo.png'],
    type: "website",
    siteName: "Valora Protocol",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valora Stablecoin | Decentralized Crypto-Backed Stablecoin Platform",
    description: "Mint, redeem, and manage crypto-backed stablecoin positions with Valora's decentralized protocol. Multiple collateral types supported with real-time health factor monitoring.",
    images: ['/logo.png'],
    creator: "@valoraprotocol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  category: "Finance",
  applicationName: "Valora Protocol",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground min-h-screen flex flex-col`}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto py-6 px-4 animate-fadeIn">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
