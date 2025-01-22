import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/hooks/theme-provider";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homepack Medical Service",
  description:
    "A robust system for patient management systems that provides patient information about patient organizations and services.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <>{children}</>

            <Toaster richColors position="top-center" />
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
