import dbConnect from "@/lib/db";
import Restaurant from "@/models/restaurant.model";
import { errorResponse, successResponse } from "@/utils/nextResponse";
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
