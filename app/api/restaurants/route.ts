import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/db";
import {
  createRestaurantSchema,
  restaurantQuerySchema,
} from "@/schemas/restaurant/restaurant.schema";
import {
  countRestaurants,
  createRestaurant,
  getAllRestaurants,
} from "@/services/restaurant/restaurant.services";
import { checkContentType, generatePagination } from "@/utils";
import { errorResponse, successResponse } from "@/utils/nextResponse";
import { formatZodErrors } from "@/utils/userInputValidation";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  dbConnect();
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());

  const result = restaurantQuerySchema.safeParse(query);
  if (!result.success) {
    const errors = formatZodErrors(result.error);
    return errorResponse("Invalid query params", 400, errors);
  }

  try {
    const session = await getSession();

    // Check if user is authenticated
    if (!session) {
      return errorResponse("Unauthorized Access", 401);
    }

    // Check if user is a restaurant
    if (session.user.role !== "restaurant") {
      return errorResponse("Forbidden Access", 403);
    }

    const restaurants = await getAllRestaurants(result.data);
    const totalItems = await countRestaurants();

    // pagination
    const { page, limit } = result.data;
    const totalPages = Math.ceil(totalItems / limit);
    const pagination = generatePagination(page, limit, totalPages, totalItems);

    // success response
    const response = {
      data: restaurants,
      pagination,
    };

    return successResponse("", 200, response);
  } catch (error) {
    console.error("Get Restaurants Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    // Check if content type is application/json
    if (!checkContentType(request)) {
      return errorResponse("Invalid content type", 400);
    }

    const session = await getSession();
    if (!session) {
      return errorResponse("Unauthorized Access", 401);
    }
    if (session.user.role !== "restaurant") {
      return errorResponse("Forbidden Access", 403);
    }

    // Get the data from the request body
    const data = await request.json();

    // validate request data
    const result = createRestaurantSchema.safeParse(data);
    if (!result.success) {
      const errors = formatZodErrors(result.error);

      return errorResponse("Invalid input data", 400, errors);
    }

    // create restaurant data in database
    const restaurant = await createRestaurant(result.data, session.user.id);

    // return success response
    return successResponse("Restaurants created successfully", 201, restaurant);
  } catch (error) {
    console.error("Restaurants creation error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}
