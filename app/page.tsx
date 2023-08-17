import Hero from "@/components/hero";
import Header from "@/components/layout/header";
import HomePageMenu from "@/components/homepage-menu";
import { type Metadata } from "next";
import { Suspense } from "react";
import FeaturedExercises from "@/components/featured-exercises";
import { ExerciseSliderSkeleton, MenuListSkeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
};

export default async function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <section className="container px-4 bg-white py-8">
        <Suspense fallback={<MenuListSkeleton length={9} />}>
          <HomePageMenu />
        </Suspense>
      </section>
      <section className="container px-4 pt-10 pb-16">
        <h2 className="text-gray-800 font-semibold text-lg mb-4">Featured exercises</h2>
        <Suspense fallback={<ExerciseSliderSkeleton length={5} />}>
          <FeaturedExercises />
        </Suspense>
      </section>
    </>
  );
}
