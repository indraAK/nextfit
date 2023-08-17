import PageHeader from "@/components/layout/page-header";
import BackButton from "@/components/layout/back-button";
import { fetchData, shuffle, getYoutubeId } from "@/lib/utils";
import type { APIResponse, Exercise } from "@/types";
import { HeartPulse, BarChart } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Carousel from "@/components/ui/carousel";
import ExerciseCard from "@/components/exercise-card";
import ShareButton from "@/components/share-button";
import LikeButton from "@/components/like-button";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function fetchExercise(id: string) {
  const res = await fetch(`https://musclewiki.com/newapi/exercise/exercises/${id}/`);
  if (!res.ok) return undefined;
  return res.json();
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch exercise data
  const exercise: Exercise | undefined = await fetchExercise(params.id);

  if (!exercise) notFound();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent!).openGraph?.images || [];

  return {
    title: exercise.name,
    keywords: exercise.seo_tags.join(", "),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: exercise.name,
      description: `Instructions: ${exercise.correct_steps.map((x) => x.text).join(" ")}`,
      images: [...previousImages, exercise.images[0].og_image],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.name,
      title: exercise.name,
      description: `Instructions: ${exercise.correct_steps.map((x) => x.text).join(" ")}`,
      images: [...previousImages, exercise.images[0].og_image],
    },
  };
}

export default async function ExerciseDetailsPage({ params }: Props) {
  const exerciseData: Exercise | undefined = await fetchExercise(params.id);

  if (!exerciseData) notFound();

  const videoIds = exerciseData.images.reduce((prev: string[], img): string[] => {
    if (!img.dst_link) return [...prev];
    const id = getYoutubeId(img.dst_link);
    if (id && !prev.includes(id)) return [...prev, id];
    return prev;
  }, []);

  const relatedExercisesData = await fetchData<APIResponse<Exercise[]>>(
    `https://musclewiki.com/newapi/exercise/exercises/?muscles=${exerciseData.muscles[0].id}`,
    { next: { revalidate: 3600 } }
  );

  const shuffledRelatedExercises = shuffle(relatedExercisesData.results.filter((x) => x.id !== exerciseData.id)).slice(0, 5);

  return (
    <>
      <PageHeader title="Exercise Details" backButton={<BackButton href="/exercises" />}>
        <div className="ml-auto flex items-center gap-4">
          <LikeButton exercise={exerciseData} />
          <ShareButton exercise={exerciseData} />
        </div>
      </PageHeader>
      <section className="container relative aspect-video mt-12">
        <video controls playsInline src={exerciseData.images[0].branded_video} className="absolute inset-0 object-cover">
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="container px-4 pb-16">
        <div className="max-w-md mx-auto bg-white py-4 rounded-xl flex justify-center space-x-6 mt-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full ">
              <HeartPulse className="text-red-400 w-6 h-6" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Category</p>
              <p className="font-medium text-sm text-slate-800 mt-0.5">{exerciseData.category.name}</p>
            </div>
          </div>
          <div role="none" className="shrink-0 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full ">
              <BarChart className="text-blue-400 w-6 h-6" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Difficulty</p>
              <p className="font-medium text-sm text-slate-800 mt-0.5">{exerciseData.difficulty.name}</p>
            </div>
          </div>
        </div>
        <h1 className="text-slate-900 text-xl font-bold sm:text-2xl mb-4 mt-10">{exerciseData.name}</h1>
        <h2 className="text-slate-700 text-lg font-medium underline decoration-wavy underline-offset-4 decoration-blue-500">Instructions:</h2>
        <ul className="grid gap-y-8 border-l border-l-slate-300 [counter-reset:step] mt-8 ml-3.5">
          {exerciseData.correct_steps.map((step) => (
            <li
              key={step.id}
              className="relative pl-8 [counter-increment:step] before:content-[counter(step)] before:w-9 before:h-9 before:rounded-full before:inline-flex before:items-center before:justify-center before:text-center before:bg-slate-200 before:text-slate-600 before:font-medium before:text-sm before:leading-none before:absolute before:top-0 before:left-0 before:-translate-x-1/2 before:border-4 before:border-slate-100"
            >
              <h3 className="text-base text-slate-700 pt-1">{step.text}</h3>
            </li>
          ))}
        </ul>

        {videoIds.length > 0 && (
          <>
            <h2 className="text-slate-800 font-semibold text-lg mt-12 mb-4">Exercise videos on YouTube</h2>
            <div className="grid gap-4">
              {videoIds.map((videoId) => (
                <div key={videoId} className="w-full aspect-video relative">
                  <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}`}></iframe>
                </div>
              ))}
            </div>
          </>
        )}
        <h2 className="text-slate-800 font-semibold text-lg mt-10 mb-4">Related exercises</h2>
        <Carousel items={shuffledRelatedExercises} renderItem={(item) => <ExerciseCard data={item} showLikeButton />} />
      </section>
    </>
  );
}
