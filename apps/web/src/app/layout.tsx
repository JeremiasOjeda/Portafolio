import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import {
  THEME_INIT_SCRIPT,
  ThemeProvider,
} from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand} — Hub de Herramientas & Portafolio (${siteConfig.name})`,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.hero.hubSubtitle,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.brand} — ${siteConfig.name}`,
    description: siteConfig.hero.tagline,
    url: siteConfig.url,
    siteName: siteConfig.brand,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
