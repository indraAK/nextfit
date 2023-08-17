import { siteConfig } from "@/config/site";
import PageContent from "./page-content";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Exercises",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Search Exercises",
    description: "Find the best exercises with our Exercise Guides and build your perfect workout.",
    images: [
      {
        url: "/og?mode=dark&title=Search Exercises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.name,
    title: "Search Exercises",
    description: "Find the best exercises with our Exercise Guides and build your perfect workout.",
    images: [
      {
        url: "/og?mode=dark&title=Search Exercises",
      },
    ],
  },
};

export default function SearchPage() {
  return (
    <>
      <PageContent />
    </>
  );
}
