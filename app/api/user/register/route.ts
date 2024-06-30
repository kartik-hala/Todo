import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid, email } = await req.json();

    if (!uid || !email) {
      alert("Please enter correct email form");
    }

    // Save user in the database
    const newUser = await db.user.create({
      data: {
        userId: uid,
        email: email,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log("[POST REGISTER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
