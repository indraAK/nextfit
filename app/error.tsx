"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Frown } from "lucide-react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 container px-4 grid place-content-center">
      <Alert
        icon={<Frown className="w-20 h-20 text-slate-500" />}
        title="Something went wrong!"
        ctaButton={
          <Button variant="primary" className="mt-4" onClick={() => reset()}>
            Try again
          </Button>
        }
      />
    </div>
  );
}
