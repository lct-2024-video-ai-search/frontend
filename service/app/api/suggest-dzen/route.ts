import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) return new NextResponse(JSON.stringify([]));
  const response = await fetch(
    `https://dzen.ru/api/v3/launcher/zen-suggest?query=${q}&page_type=video_feed`
  );
  const data = (await response.json()) as Promise<any>;
  if (!data) return new NextResponse(JSON.stringify([]));

  // @ts-ignore
  const suggestions = data["items"].map((e) => e["suggest_source"]["query"]);

  return new NextResponse(JSON.stringify(suggestions));
}
