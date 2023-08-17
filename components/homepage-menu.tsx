import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/lib/utils";
import type { Muscle, APIResponse } from "@/types";
import MuscleDrawer from "./muscle-drawer";

export default async function HomePageMenu() {
  const { results: muscles } = await fetchData<APIResponse<Muscle[]>>("https://musclewiki.com/newapi/muscle/muscles/");

  return (
    <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6">
      {muscles.slice(0, 8).map((muscle) => (
        <li key={muscle.id}>
          <Link href={`/exercises?muscle=${muscle.id}`} className="flex flex-col items-center justify-center gap-2.5 bg-white">
            <span className="w-12 h-12 rounded-full bg-blue-100 p-2 flex items-center justify-center">
              <Image src="/images/gym-home.png" width={22} height={22} alt={muscle.name} className="w-5 h-5" />
            </span>
            <span className="text-slate-800 font-medium text-xs text-center">{muscle.name}</span>
          </Link>
        </li>
      ))}
      <li>
        <MuscleDrawer muscles={muscles} />
      </li>
    </ul>
  );
}
