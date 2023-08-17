import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Exercise } from "@/types";

type ExerciseState = {
  exercises: Exercise[];
  like: (exercise: Exercise) => void;
  isLiked: (id: number) => boolean;
  disLike: (id: number) => void;
};

export const useExerciseStore = create<ExerciseState>()(
  persist(
    (set, get) => ({
      exercises: [],
      isLiked: (id) => get().exercises.find((ex) => ex.id === id) !== undefined,
      like: (exercise) => set({ exercises: [exercise, ...get().exercises] }),
      disLike: (id) => set({ exercises: get().exercises.filter((ex) => ex.id !== id) }),
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
