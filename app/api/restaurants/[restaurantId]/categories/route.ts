import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Category from "@/models/category.model";
import { createCategorySchema } from "@/schemas/category/category.shema";
import { checkContentType } from "@/utils";
import { errorResponse, successResponse } from "@/utils/nextResponse";
import { formatZodErrors } from "@/utils/userInputValidation";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

type Params = Promise<{ restaurantId: string }>;

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  await dbConnect();
  const { restaurantId } = await params;

  // start a new session
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    // check if content type is application/json
    if (!checkContentType(request)) {
      return errorResponse("Invalid content type", 400);
    }

    // check authentication and authorization
    const session = await getSession();
    if (!session) {
      return errorResponse("Unauthorized Access", 401);
    }
    if (session.user.role !== "restaurant") {
      return errorResponse("Forbidden Access", 403);
    }

    // get the data from the request body
    const body = await request.json();

    // validate request data
    const result = createCategorySchema.safeParse(body);
    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return errorResponse("Invalid input data", 400, errors);
    }

    // create category data in database
    const category = await Category.create([{ ...result.data, restaurantId }], {
      mongoSession,
    });

    // commit the transaction
    await mongoSession.commitTransaction();

    // return success response
    return successResponse("Category created successfully", 201, category);
  } catch (error) {
    // rollback the transaction
    await mongoSession.abortTransaction();
    
    console.error("Create Category Error: ", error);
    return errorResponse("Internal Server Error", 500);
  } finally {
    mongoSession.endSession();
  }
}
