import PageContent from "./page-content";
import PageHeader from "@/components/layout/page-header";
import BackButton from "@/components/layout/back-button";
import { type Metadata } from "next";
import { fetchData } from "@/lib/utils";
import type { APIResponse, Muscle, Difficulty } from "@/types";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Browse Visual Exercises",
  description:
    "Browse our library of illustrated exercises for women, men, weight loss, home and gym, glutes, toning, strength, flexibility and more. Earn your dream body with Fit!",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Browse Visual Exercises",
    description:
      "Browse our library of illustrated exercises for women, men, weight loss, home and gym, glutes, toning, strength, flexibility and more. Earn your dream body with Fit!",
    images: [
      {
        url: "/og?mode=dark&title=Browse Visual Exercises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.name,
    title: "Browse Visual Exercises",
    description:
      "Browse our library of illustrated exercises for women, men, weight loss, home and gym, glutes, toning, strength, flexibility and more. Earn your dream body with Fit!",
    images: [
      {
        url: "/og?mode=dark&title=Browse Visual Exercises",
      },
    ],
  },
};

export default async function ExercisesPage() {
  const [musclesData, difficultiesData] = await Promise.all([
    fetchData<APIResponse<Muscle[]>>("https://musclewiki.com/newapi/muscle/muscles/"),
    fetchData<APIResponse<Difficulty[]>>("https://musclewiki.com/newapi/exercise/difficulties/"),
  ]);

  return (
    <>
      <PageHeader title="Exercises" backButton={<BackButton href="/" />} />
      <PageContent muscles={musclesData.results} difficulties={difficultiesData.results} />
    </>
  );
}
