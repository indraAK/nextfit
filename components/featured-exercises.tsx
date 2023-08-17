import { fetchData, shuffle } from "@/lib/utils";
import Carousel from "./ui/carousel";
import ExerciseCard from "./exercise-card";
import type { APIResponse, Exercise } from "@/types";

export default async function FeaturedExercises() {
  const { results } = await fetchData<APIResponse<Exercise[]>>("https://musclewiki.com/newapi/exercise/exercises/", { next: { revalidate: 3600 } });
  const featuredExercises = shuffle(results.filter((exercise) => exercise.featured)).slice(0, 5);

  return (
    <>
      <Carousel items={featuredExercises} renderItem={(item) => <ExerciseCard data={item} showLikeButton />} />
    </>
  );
}
