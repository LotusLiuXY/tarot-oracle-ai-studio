import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Inter, Noto_Sans_SC, Noto_Serif_SC, Playfair_Display } from "next/font/google";
import { EazoProvider } from "@eazo/sdk/react";
import { cn } from "@/utils/utils";
import { Toaster } from "@/components/ui/sonner";
import { UserSyncEffect } from "@/components/user-profile/user-sync-effect";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { LocaleSyncEffect } from "@/components/i18n/locale-sync-effect";
import { PreviewInspector } from "@/components/eazo/preview-inspector";
import { getServerLocale } from "@/lib/i18n/server-preference";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSc = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-noto-sans-sc" });
const notoSerifSc = Noto_Serif_SC({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-noto-serif-sc" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-playfair" });

const SITE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const SITE_TITLE = process.env.NEXT_PUBLIC_APP_TITLE?.trim() || "Eazo App";
const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION?.trim() || "An app built by eazo.ai";

const EAZO_APP_ID = process.env.EAZO_APP_ID?.trim();
const EAZO_BRAND_BANNER_SRC =
  "https://cdn.eazo.ai/branding/eazo-brand-banner.js";

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "https://eazo.ai/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Eazo",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        "font-sans",
        inter.variable,
        notoSansSc.variable,
        notoSerifSc.variable,
        playfair.variable,
      )}
    >
      <body
        className="h-full flex flex-col"
        data-eazo-preview-inspector-runtime=""
      >
        <I18nProvider>
          <EazoProvider>
            <LocaleSyncEffect />
            <UserSyncEffect />
            {children}
            <Toaster />
            <PreviewInspector />
          </EazoProvider>
        </I18nProvider>
        {EAZO_APP_ID && (
          <Script
            src={EAZO_BRAND_BANNER_SRC}
            strategy="afterInteractive"
            data-eazo-app-id={EAZO_APP_ID}
          />
        )}
      </body>
    </html>
  );
}
