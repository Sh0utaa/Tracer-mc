import type { SessionResults } from "@/types";
import { endOfDay, startOfDay } from "date-fns";
import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { city } = await req.json();

  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  try {
    const existingMasterclassSession = await db.masterclassSession.findFirst({
      where: {
        city,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    if (existingMasterclassSession) {
      return NextResponse.json(
        { message: "Event already exists", id: existingMasterclassSession.id },
        { status: 200 },
      );
    }
    const newMasterclassSession = await db.masterclassSession.create({
      data: {
        city,
        sessionResults: {},
      },
    });
    return NextResponse.json(
      { message: "Event recorded successfully!", id: newMasterclassSession.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving event:", error);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const city = searchParams.get("city");

  if (id) {
    // Fetch session by ID
    try {
      const session = await db.masterclassSession.findUnique({
        where: { id },
      });

      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }

      return NextResponse.json({ session }, { status: 200 });
    } catch (error) {
      console.error("Error retrieving session:", error);
      return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
    }
  } else if (city) {
    try {
      const sessions = await db.masterclassSession.findMany({
        where: { city },
      });

      return NextResponse.json({ sessions }, { status: 200 });
    } catch (error) {
      console.error("Error retrieving sessions by city:", error);
      return NextResponse.json({ error: "Failed to retrieve sessions" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const { id, newResult } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  try {
    const existingMasterclassSession = await db.masterclassSession.findUnique({
      where: { id },
    });
    if (!existingMasterclassSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const currentResults = (existingMasterclassSession.sessionResults as SessionResults) || {};

    const updatedSession = await db.masterclassSession.update({
      where: { id },
      data: {
        sessionResults: { ...currentResults, ...newResult },
      },
    });

    return NextResponse.json(
      { message: "Session updated successfully!", session: updatedSession },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}
