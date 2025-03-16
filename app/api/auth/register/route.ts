import { NextRequest } from "next/server";
import mongoose from "mongoose";

import { registerSchema } from "@/schemas/auth/auth.schema";
import { formatZodErrors } from "@/utils/userInputValidation";
import dbConnect from "@/lib/db";
import { errorResponse, successResponse } from "@/utils/nextResponse";
import { createUser, findUserByEmail } from "@/services/user/user.services";
import { createAddress } from "@/services/address/address.services";
import { createProfile } from "@/services/profile/profile.services";
import { checkContentType } from "@/utils";

export async function POST(req: NextRequest) {
  await dbConnect();
  // Start a new session
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check if content type is application/json
    if (!checkContentType(req)) {
      return errorResponse("Invalid content type", 400);
    }

    const body = await req.json();

    // Validate user input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const errors = formatZodErrors(result.error);

      return errorResponse("Invalid input data", 400, errors);
    }

    // Check if email already exists
    const existingUser = await findUserByEmail(result.data.email);

    if (existingUser) return errorResponse("Email already exists", 409);

    const newUser = await createUser(result.data);
    await createAddress(newUser._id);
    await createProfile(newUser._id);

    // commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send success response
    return successResponse("", 201, {
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Registration Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}
