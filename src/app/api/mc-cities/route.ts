import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const cities = await db.masterclassSession.findMany({
      select: {
        city: true,
      },
      distinct: ["city"],
    });

    // test123

    const uniqueCities = cities.map((session) => session.city);
    return NextResponse.json({ cities: uniqueCities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}
