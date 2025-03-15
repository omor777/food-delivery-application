import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
