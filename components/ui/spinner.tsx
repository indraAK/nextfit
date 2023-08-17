import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "inline-block rounded-full border-solid border-t-current border-r-current border-b-transparent border-l-transparent animate-spin",
  {
    variants: {
      variant: {
        default: "border-t-slate-800 border-r-slate-800",
        primary: "border-t-blue-500 border-r-blue-500",
        destructive: "border-t-red-500 border-r-red-500",
      },
      size: {
        default: "w-8 h-8 border-4",
        sm: "w-6 h-6 border-2",
        lg: "w-12 h-12 border-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {}

export default function Spinner({ variant, size, className }: SpinnerProps) {
  return (
    <div className={cn(spinnerVariants({ variant, size, className }))}>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
