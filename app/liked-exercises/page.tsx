import PageHeader from "@/components/layout/page-header";
import BackButton from "@/components/layout/back-button";
import PageContent from "./page-content";
import { type Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Liked Exercises",
  description: "Your liked exercises to use in your routines",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Liked Exercises",
    description: "Your liked exercises to use in your routines",
    images: [
      {
        url: "/og?mode=dark&title=Your Liked Exercises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.name,
    title: "Liked Exercises",
    description: "Your liked exercises to use in your routines",
    images: [
      {
        url: "/og?mode=dark&title=Your Liked Exercises",
      },
    ],
  },
};

export default function LikedExercisesPage() {
  return (
    <>
      <PageHeader title="Liked Exercises" backButton={<BackButton href="/" />} />
      <PageContent />
    </>
  );
}
