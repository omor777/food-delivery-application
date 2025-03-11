import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas/auth/auth.schema";
import { formatZodErrors } from "@/utils/userInputValidation";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    // Check if content type is application/json
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Validate user input
    const validation = registerSchema.safeParse(body);
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
    // Hash password
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
