"use client";

import type { Exercise } from "@/types";
import { Share2 } from "lucide-react";

export default function ShareButton({ exercise }: { exercise: Exercise }) {
  const shareData = {
    title: exercise.name,
    url: `/exercises/${exercise.id}`,
  };

  async function handleShare() {
    try {
      // feature check
      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      }
    } catch (err) {
      alert("OOps, share not available at the moment!");
    }
  }

  return (
    <button aria-label="Share exercise" title="Share exercise" onClick={handleShare}>
      <Share2 aria-hidden="true" className="w-5 h-5 text-slate-500 hover:text-slate-700" />
    </button>
  );
}
