import { NextResponse } from "next/server";
import { getLatestMediaNews, getLatestOfficialNews } from "@/lib/official-news";

export const revalidate = 3600;

export async function GET() {
  const [official, media] = await Promise.all([
    getLatestOfficialNews(),
    getLatestMediaNews(),
  ]);

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    official,
    media,
  });
}
