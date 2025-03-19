import Restaurant, { IRestaurant } from "@/models/restaurant.model";
import {
  CreateRestaurantInput,
  RestaurantQuery,
} from "@/schemas/restaurant/restaurant.schema";
import { HydratedDocument } from "mongoose";

export const createRestaurant = async (
  data: CreateRestaurantInput,
  ownerId: string
): Promise<IRestaurant> => {
  const restaurant: HydratedDocument<IRestaurant> = new Restaurant({
    ...data,
    owner: ownerId,
  });

  return (await restaurant.save()).toObject();
};

export const findRestaurantById = async (id: string) => {
  return await Restaurant.findOne({ owner: id }).lean();
};

export const getAllRestaurants = async ({
  page,
  limit,
  status,
  sortBy,
  sortType,
}: RestaurantQuery): Promise<IRestaurant[]> => {
  const skip = (page - 1) * limit;

  // filter
  const filter: { status?: "pending" | "approved" | "rejected" } = {};
  if (status) {
    filter.status = status;
  }

  const sortOrder = sortType === "asc" ? 1 : -1;

  return await Restaurant.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .select(["-__v"])
    .lean<IRestaurant[]>();
};

export const countRestaurants = async () => {
  return await Restaurant.countDocuments();
};
