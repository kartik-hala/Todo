import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { adminAuth } from "@/app/firebase-admin/admin-config";

export async function POST(req: Request) {
  try {
    // Extract the ID token from the Authorization header
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the ID token and get the user's UID
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { todoTitle } = await req.json();

    if (!todoTitle) {
      return new NextResponse("Title required", { status: 400 });
    }

    // Create a new todo in the database
    const todo = await db.todo.create({
      data: {
        title: todoTitle,
        userId: userId,
      },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
