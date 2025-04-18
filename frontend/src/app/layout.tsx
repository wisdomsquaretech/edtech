import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/NavSection";

import LanguageBannerSection from "@/components/LanguageBannerSection";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EdTech Platform",
  description: "An educational technology platform for tutors and students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {/* Language Banner */}
        {/* <LanguageBannerSection /> */}

        {/* Navigation */}
        <Nav />
      
        
        {children}
      </body>
    </html>
  );
}
