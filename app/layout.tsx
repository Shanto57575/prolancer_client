import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Montserrat } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import NextTopLoader from "nextjs-toploader";

import { NotificationProvider } from "@/context/NotificationContext";
import ScrollToTop from "@/components/Shared/ScrollToTop";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "prolancer",
  description: "A freelancing application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ScrollToTop />
        <NextTopLoader color="#10B981" showSpinner={false} />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <NotificationProvider initialUser={null}>
          {children}
        </NotificationProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
