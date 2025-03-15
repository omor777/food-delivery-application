import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

import JWT from "jsonwebtoken";

import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = JWT.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          token,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
