import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const res = await fetch(`https://musclewiki.com/newapi/exercise/exercises/?${searchParams.toString()}`);

  if (!res.ok) {
    return new NextResponse("Could not find requested resource", {
      status: res.status,
      statusText: res.statusText,
    });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
