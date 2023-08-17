import BottomNav from "@/components/layout/bottom-navigation";
import ScrollToTop from "@/components/ui/scroll-top";
import { Inter } from "next/font/google";
import "./globals.css";
import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og?mode=dark&description=NextFit provides a collection of exercises and free exercise video demonstrations.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: "/og?mode=dark&description=NextFit provides a collection of exercises and free exercise video demonstrations.",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <main className="pb-16">{children}</main>
        <ScrollToTop />
        <BottomNav />
      </body>
    </html>
  );
}
