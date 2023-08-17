export type Muscle = {
  id: number;
  name: string;
  url_name: string;
  description: string;
};

export type Difficulty = {
  id: number;
  name: string;
};

export type Image = {
  id: number;
  dst_link: string;
  src_image: string;
  og_image: string;
  original_video: string;
  branded_video: string;
};

export type Exercise = {
  id: number;
  name: string;
  weight: number;
  description: string;
  featured: boolean;
  status: string;
  details: string;
  steps: string[];
  videoURL: string[];
  muscles: Muscle[];
  category: {
    id: number;
    name: string;
  };
  difficulty: {
    id: number;
    name: string;
  };
  images: Image[];
  correct_steps: { id: number; order: number; text: string }[];
  seo_tags: string[];
};

export type APIResponse<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
};

export type SearchExerciseAPIResponse = {
  has_next: boolean;
  has_prev: boolean;
  page_count: number;
  suggestions: Exercise[];
  total_count: number;
};

export interface FetchError extends Error {
  info?: any;
  status?: number;
}
