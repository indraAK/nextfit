import type { Exercise } from "@/types";
import classNames from "classnames";
import React from "react";
import ExerciseCard from "./exercise-card";

type ExerciseListProps = React.HTMLAttributes<HTMLUListElement> & {
  showLikeButton?: boolean;
  data: Exercise[];
};

export default function ExerciseList({ data, showLikeButton = false, className }: ExerciseListProps) {
  return (
    <ul className={classNames("grid sm:grid-cols-2 gap-4", className)}>
      {data.map((exercise) => (
        <li key={exercise.id}>
          <ExerciseCard data={exercise} showLikeButton={showLikeButton} />
        </li>
      ))}
    </ul>
  );
}
