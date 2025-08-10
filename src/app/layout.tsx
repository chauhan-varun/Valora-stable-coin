import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";

import '@rainbow-me/rainbowkit/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSC dApp",
  description: "Decentralized Stablecoin Application",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto py-6 px-4 animate-fadeIn">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
