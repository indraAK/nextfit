import { cn } from "@/lib/utils";

interface SkeletonListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  length: number;
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-800", className)} {...props} />;
}

export function ExerciseCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white px-2 pt-2 pb-4 rounded-md space-y-3 overflow-hidden shadow", className)} {...props}>
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="inline-block h-3 w-1/5" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="inline-block h-3 w-1/5" />
      <Skeleton className="inline-block h-3 w-1/5 ml-2" />
    </div>
  );
}

export function ExerciseSliderSkeleton({ className, length = 2, ...props }: SkeletonListProps) {
  return (
    <div className={cn("snap-x snap-mandatory flex gap-4 overflow-x-scroll", className)} {...props}>
      {Array.from({ length }, (_, i) => (
        <div key={i} className="snap-start flex-shrink-0 w-[85%]">
          <ExerciseCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function ExerciseListSkeleton({ className, length = 2, ...props }: SkeletonListProps) {
  return (
    <div className={cn("grid sm:grid-cols-2 gap-4", className)} {...props}>
      {Array.from({ length }, (_, i) => (
        <ExerciseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function MenuSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2.5 bg-white", className)} {...props}>
      <Skeleton className="w-12 h-12 rounded-full" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function MenuListSkeleton({ className, length = 2, ...props }: SkeletonListProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6", className)} {...props}>
      {Array.from({ length }, (_, i) => (
        <MenuSkeleton key={i} />
      ))}
    </div>
  );
}
