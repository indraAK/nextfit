import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FetchError } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export async function fetchData<TResponse = any>(url: string, options?: RequestInit): Promise<TResponse> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error: FetchError = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export function getYoutubeId(youtubeVideoURL: string) {
  const url = youtubeVideoURL.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

export function getExerciseImageUrl(url: string) {
  const baseImgUrl = "https://media.musclewiki.com/media/uploads/";
  const fileName = url.split("/").at(-1)?.split(".").at(0);
  return baseImgUrl + `og-${fileName}.png`;
}
