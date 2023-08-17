"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleShowScrollTopBtn = useCallback(() => {
    window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleShowScrollTopBtn);

    return () => window.removeEventListener("scroll", toggleShowScrollTopBtn);
  }, [toggleShowScrollTopBtn]);

  return (
    <Button
      variant="primary"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={cn(
        "w-10 h-10 p-2 rounded-full shadow-lg border-0 fixed bottom-20 right-4 z-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out",
        !isVisible && "hidden"
      )}
    >
      <ArrowUp aria-hidden="true" focusable="false" />
    </Button>
  );
}
