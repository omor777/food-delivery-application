import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { userSchema } from "@/schemas/user.schema";
import { formatZodErrors } from "@/utils/userInputValidation";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      const errors = formatZodErrors(validation.error);
      return NextResponse.json(
        { success: false, message: "Invalid input data", data: errors },
        { status: 400 }
      );
    }
    // Check if email already exists
    const existingUser = await User.findOne({ email: validation.data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    validation.data.password = await bcrypt.hash(validation.data.password, 10);

    const newUser = await User.create(validation.data);

    const data = {
      success: true,
      message: "User registered successfully",
      data: {
        userId: newUser._id,
      },
    };

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
