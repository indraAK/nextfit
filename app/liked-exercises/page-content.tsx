"use client";

import { useState, useEffect } from "react";
import { useExerciseStore } from "@/stores/exercise";
import ExerciseList from "@/components/exercise-list";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Frown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PageContent() {
  const exercises = useExerciseStore((state) => state.exercises);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated)
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center">
        <Spinner variant="primary" size="lg" />
      </div>
    );

  return (
    <section className="container px-4 pt-16 pb-16">
      {exercises.length > 0 ? (
        <>
          <h1 className="text-lg text-slate-800 font-semibold mt-2 mb-4">Your liked exercises</h1>
          <ExerciseList data={exercises} showLikeButton />
        </>
      ) : (
        <div className="fixed inset-0 w-full h-full grid place-content-center">
          <Alert
            icon={<Frown className="w-20 h-20 text-slate-500" />}
            title="No liked exercises yet"
            ctaButton={
              <Link href="/exercises" className={cn(buttonVariants({ variant: "primary" }), "mt-4")}>
                Explore Exercises
              </Link>
            }
          />
        </div>
      )}
    </section>
  );
}
