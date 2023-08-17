import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 container px-4 grid place-content-center">
      <Alert
        icon={<Frown className="w-20 h-20 text-slate-500" />}
        title="Page not found"
        description="The page you are looking for does not exist"
        ctaButton={
          <Link href="/" className={cn(buttonVariants({ variant: "primary" }), "mt-4")}>
            Go to Home
          </Link>
        }
      />
    </div>
  );
}
