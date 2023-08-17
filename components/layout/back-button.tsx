import Link, { LinkProps } from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackButton(props: LinkProps) {
  return (
    <Link {...props} aria-label="Back" className="text-slate-500 hover:text-slate-700 select-none">
      <ChevronLeft className="scale-150 -ml-1" />
    </Link>
  );
}
