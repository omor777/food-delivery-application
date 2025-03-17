import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { findRestaurantById } from "@/services/restaurant/restaurant.services";
import { checkContentType } from "@/utils";
import { errorResponse, successResponse } from "@/utils/nextResponse";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const session = await getSession();

    if (!session) {
      return errorResponse("Unauthorized Access", 401);
    }

    if (session.user.role !== "restaurant") {
      return errorResponse("Forbidden Access", 403);
    }

    const restaurant = await findRestaurantById(session.user.id);

    if (!restaurant) {
      return errorResponse("Not Found", 404);
    }

    return successResponse("", 200, restaurant);
  } catch (error) {
    console.error("Get Single Restaurant Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}
