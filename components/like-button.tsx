"use client";

import type { Exercise } from "@/types";
import { Heart } from "lucide-react";
import { useExerciseStore } from "@/stores/exercise";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

export default function LikeButton({ exercise }: { exercise: Exercise }) {
  const store = useExerciseStore();
  const [hydrated, setHydrated] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  function handleClick() {
    if (store.isLiked(exercise.id)) {
      btnRef.current?.classList.remove("before:animate-ping");
      store.disLike(exercise.id);
    } else {
      btnRef.current?.classList.add("before:animate-ping");
      store.like(exercise);
    }
  }

  if (!hydrated) return <Heart aria-hidden="true" className="w-5 h-5 text-slate-200 fill-current animate-pulse" />;

  return (
    <button
      ref={btnRef}
      className={cn(
        "relative isolate inline-flex justify-center items-center w-6 h-6 active:rotate-12 duration-200 before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-red-500 before:pointer-events-none before:scale-0 before:z-[-1] before:[animation-iteration-count:1]"
      )}
      aria-label={store.isLiked(exercise.id) ? "Dislike exercise" : "Like exercise"}
      title={store.isLiked(exercise.id) ? "Dislike" : "Like"}
      onClick={handleClick}
    >
      <Heart aria-hidden="true" className={cn("w-5 h-5", store.isLiked(exercise.id) ? "text-red-500 fill-current" : "text-slate-500")} />
    </button>
  );
}
