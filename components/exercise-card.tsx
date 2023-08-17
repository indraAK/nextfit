"use client";

import type { Exercise } from "@/types";
import { Dumbbell, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn, getExerciseImageUrl } from "@/lib/utils";
import LikeButton from "@/components/like-button";

type ExerciseCardProps = {
  data: Exercise;
  showLikeButton?: boolean;
};

export default function ExerciseCard({ data, showLikeButton = false }: ExerciseCardProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const imgUrl = data.images[0].og_image ?? getExerciseImageUrl(data.images[0].branded_video);

  return (
    <div className="bg-white px-2 pt-2 pb-6 rounded-md w-full h-full overflow-hidden shadow">
      <Link href={`/exercises/${data.id}`} className="relative block w-full aspect-video rounded-md">
        <Image
          onLoadingComplete={() => setIsLoadingImage(false)}
          src={imgUrl}
          fill
          sizes="(max-width: 768px) 100vw"
          alt={data.name}
          className={cn("w-full h-full object-cover rounded-md", isLoadingImage ? "blur-sm" : "blur-0")}
        />
      </Link>
      <div className="mt-3 px-2">
        <div className="flex justify-between gap-3 items-center">
          <span className="inline-block bg-blue-100 text-blue-700 font-medium text-xs px-2 py-0.5 rounded">
            {data.category.name ?? data.category}
          </span>
          {showLikeButton && <LikeButton exercise={data} />}
        </div>
        <h3 className="font-semibold text-lg mt-3 max-w-xs">
          <Link href={`/exercises/${data.id}`} className="text-slate-800 capitalize line-clamp-1">
            {data.name}
          </Link>
        </h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {data.muscles !== undefined ? (
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
              <Dumbbell size={16} />
              <p className="text-xs">{data.muscles[0].name}</p>
            </div>
          ) : null}
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-md">
            <BarChart size={16} />
            <p className="text-xs">{data.difficulty.name ?? data.difficulty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
