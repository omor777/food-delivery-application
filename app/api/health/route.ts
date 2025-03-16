import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const session = await getSession();
    console.log(session, "session");
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/health: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
