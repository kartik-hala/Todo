import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json(); // Extract userId from JSON body

    if (typeof userId !== "string") {
      throw new Error("Invalid userId parameter");
    }

    // Fetch todos for the specified userId
    const todos = await db.todo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
