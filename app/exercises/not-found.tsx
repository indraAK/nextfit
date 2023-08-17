import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 container px-4 grid place-content-center">
      <Alert
        icon={<Frown className="w-20 h-20 text-slate-500" />}
        title="Not Found"
        description="Could not find requested resource."
        ctaButton={
          <Link href="/exercises" className={cn(buttonVariants({ variant: "primary" }), "mt-4")}>
            View all exercises
          </Link>
        }
      />
    </div>
  );
}
