import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Restaurant from "@/models/restaurant.model";
import { updateRestaurantSchema } from "@/schemas/restaurant/restaurant.schema";
import { checkContentType } from "@/utils";
import { errorResponse, successResponse } from "@/utils/nextResponse";
import { formatZodErrors } from "@/utils/userInputValidation";
import { NextRequest } from "next/server";

type Params = Promise<{ restaurantId: string }>;
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  await dbConnect();
  const { restaurantId } = await params;

  try {
    const restaurant = await Restaurant.findById(restaurantId)
      .select(["-__v"])
      .lean();

    return successResponse("", 200, restaurant);
  } catch (error) {
    console.error("Get Single Restaurant Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();

    const { restaurantId } = await params;

    // Check if content type is application/json
    if (!checkContentType(request)) {
      return errorResponse("Invalid content type", 400);
    }
    // check if user is authenticated
    const session = await getSession();

    if (!session) {
      return errorResponse("Unauthorized Access", 401);
    }

    // check if user is a restaurant
    if (session.user.role !== "restaurant") {
      return errorResponse("Forbidden Access", 403);
    }

    // get the data from the request body
    const body = await request.json();

    // validate request data
    const result = updateRestaurantSchema.safeParse(body);
    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return errorResponse("Invalid input data", 400, errors);
    }

    // get the data from the database
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      result.data,
      { new: true, lean: true, select: ["-__v"] }
    );

    // check if data exists

    // if not found return not found response
    if (!updatedRestaurant) {
      return errorResponse("Not Found", 404);
    }

    return successResponse("", 200, updatedRestaurant);
  } catch (error) {
    console.error("Update Single Restaurant Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}
