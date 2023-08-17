import { NextResponse } from "next/server";
import type { Image } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const res = await fetch(`https://musclewiki.com/api/search/exercises/suggest/?q=${q}`);

  if (!res.ok) {
    return new NextResponse("Could not find requested resource", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  let data = await res.json();

  for (let i = 0; i < data.suggestions.length; i++) {
    const images = Object.values(data.suggestions[i].item.images).reduce<Image[]>((prev, current: any) => {
      return [...prev, ...current];
    }, []);

    data.suggestions[i].item.images = images;
  }

  data.suggestions = data.suggestions.map((s: any) => s.item);

  return NextResponse.json(data);
}
