"use client";

import { Drawer } from "vaul";
import { LayoutGrid, X } from "lucide-react";
import type { Muscle } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  muscles: Muscle[];
};

export default function MuscleDrawer({ muscles }: Props) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="w-full flex flex-col items-center justify-center gap-2.5 bg-white">
          <span className="w-12 h-12 rounded-full bg-blue-100 p-2 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-blue-500" />
          </span>
          <span className="text-slate-800 font-medium text-xs text-center">See All</span>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[1001]">
          <div className="bg-white rounded-t-[10px] flex-1 overflow-auto">
            <div className="sticky top-0 h-12 pt-3 bg-white rounded-t-[10px] border-b">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-6" />
              <Drawer.Close asChild>
                <button aria-label="Close" className="absolute top-1/2 -translate-y-1/2 right-4">
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </Drawer.Close>
            </div>

            <div className="max-w-md mx-auto p-4">
              <Drawer.Title className="text-slate-800 font-semibold text-[17px] mb-6">List of muscles</Drawer.Title>
              <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {muscles
                  .filter((muscle) => muscle.name !== "")
                  .map((muscle) => (
                    <li key={muscle.id}>
                      <Link href={`/exercises?muscle=${muscle.id}`} className="flex flex-col items-center justify-center gap-2.5 bg-white">
                        <span className="w-12 h-12 rounded-full bg-blue-100 p-2 flex items-center justify-center">
                          <Image src="/images/gym-home.png" width={22} height={22} alt={muscle.name} className="w-5 h-5" />
                        </span>
                        <span className="text-slate-800 font-medium text-xs text-center">{muscle.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
