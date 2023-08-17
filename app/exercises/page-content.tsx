"use client";

import useSWR from "swr";
import { fetchData } from "@/lib/utils";
import ExerciseList from "@/components/exercise-list";
import { ExerciseListSkeleton } from "@/components/ui/skeleton";
import { notFound, useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import type { APIResponse, Exercise, Muscle, Difficulty, FetchError } from "@/types";
import { ChevronLeft, ChevronRight, Frown } from "lucide-react";
import { Alert } from "@/components/ui/alert";

type PageContentProps = {
  muscles: Muscle[];
  difficulties: Difficulty[];
};

const fetcher = async (url: string) => await fetchData(url);

export default function PageContent({ muscles, difficulties }: PageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const muscleId = searchParams.get("muscle");
  const difficultyId = searchParams.get("difficulty");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedMuscleId, setSelectedMuscleId] = useState(muscleId || "0");
  const [selectedDifficultyId, setSelectedDifficultyId] = useState(difficultyId || "0");
  const exerciseApiUrl = useRef(`/api/exercises?offset=${pageIndex}`);

  if ((muscleId && !isExistInAttrs("muscle", Number(muscleId))) || (difficultyId && !isExistInAttrs("difficulty", Number(difficultyId)))) {
    notFound();
  }

  if (muscleId && isExistInAttrs("muscle", Number(muscleId)) && difficultyId && isExistInAttrs("difficulty", Number(difficultyId))) {
    exerciseApiUrl.current = `/api/exercises?muscles=${muscleId}&difficulty=${difficultyId}&offset=${pageIndex}`;
  } else if (muscleId && isExistInAttrs("muscle", Number(muscleId))) {
    exerciseApiUrl.current = `/api/exercises?muscles=${muscleId}&offset=${pageIndex}`;
  } else if (difficultyId && isExistInAttrs("difficulty", Number(difficultyId))) {
    exerciseApiUrl.current = `/api/exercises?difficulty=${difficultyId}&offset=${pageIndex}`;
  } else {
    exerciseApiUrl.current = `/api/exercises?offset=${pageIndex}`;
  }

  const { data: exercisesData, isLoading, error } = useSWR<APIResponse<Exercise[]>, FetchError>(exerciseApiUrl.current, fetcher);
  const filteredExercisesData = exercisesData?.results.filter((exercise) => exercise.status === "Published" && exercise.difficulty !== null);

  function isExistInAttrs(attributeName: "muscle" | "difficulty", id: number) {
    if (attributeName === "muscle") return muscles.some((m) => m.id === id);
    if (attributeName === "difficulty") return difficulties.some((d) => d.id === id);
  }

  function handleValueChange(fieldName: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (fieldName === "muscle") {
      value === "0" ? params.delete("muscle") : params.set("muscle", value);
      setSelectedMuscleId(value);
    } else if (fieldName === "difficulty") {
      value === "0" ? params.delete("difficulty") : params.set("difficulty", value);
      setSelectedDifficultyId(value);
    }

    setPageIndex(0);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="container px-4 pt-16 pb-16">
      <h1 className="text-lg text-slate-800 font-medium mt-2 max-w-md">
        Browse visual exercises to use in your routines and earn your dream body with Fit!.
      </h1>

      <div className="grid grid-cols-2 gap-4 my-8">
        <div className="grid gap-1.5">
          <label htmlFor="muscle" className="text-sm font-medium text-slate-700">
            Muscle
          </label>
          <select
            value={selectedMuscleId}
            onChange={(e) => handleValueChange("muscle", e.target.value)}
            disabled={isLoading}
            id="muscle"
            className="form-control"
          >
            <option value="0">All</option>
            {muscles
              .filter((item) => item.name !== "")
              .map((m) => (
                <option value={m.id} key={m.id}>
                  {m.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="difficulty" className="text-sm font-medium text-slate-700">
            Difficulty
          </label>
          <select
            value={selectedDifficultyId}
            onChange={(e) => handleValueChange("difficulty", e.target.value)}
            disabled={isLoading}
            id="difficulty"
            className="form-control"
          >
            <option value="0">All</option>
            {difficulties.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-10">
          <Alert
            icon={<Frown className="w-20 h-20 text-slate-500" />}
            title="Failed to fetch"
            description="An error occurred while fetching the data."
          />
        </div>
      )}

      {isLoading && !error && <ExerciseListSkeleton length={4} />}
      {!isLoading && !error && exercisesData !== undefined && exercisesData.count > 0 && (
        <>
          <ExerciseList data={filteredExercisesData!} showLikeButton />
          <div className="flex justify-center gap-4 mt-8">
            {exercisesData.previous !== null && (
              <Button
                onClick={() => {
                  const params = new URLSearchParams(exercisesData.previous!);
                  setPageIndex(Number(params.get("offset")));
                }}
                variant="ghost"
                size="sm"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Prev
              </Button>
            )}
            {exercisesData.next !== null && (
              <Button
                onClick={() => {
                  const params = new URLSearchParams(exercisesData.next!);
                  setPageIndex(Number(params.get("offset")));
                }}
                variant="primary"
                size="sm"
                className="shadow-lg shadow-blue-200"
              >
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </>
      )}

      {!isLoading && !error && exercisesData !== undefined && exercisesData.count === 0 && (
        <div className="flex flex-col items-center gap-3 mt-10">
          <Alert icon={<Frown className="w-20 h-20 text-slate-500" />} title="Exercises not found" />
        </div>
      )}
    </section>
  );
}
