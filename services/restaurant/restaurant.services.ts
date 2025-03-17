import Restaurant, { IRestaurant } from "@/models/restaurant.model";
import { CreateRestaurantInput } from "@/schemas/restaurant/restaurant.schema";

export const createRestaurant = async (
  data: CreateRestaurantInput,
  ownerId: string
) => {
  const restaurant: IRestaurant = new Restaurant({
    ...data,
    owner: ownerId,
  });

  return (await restaurant.save()).toObject();
};

export const findRestaurantById = async (id: string) => {
  return await Restaurant.findOne({ owner: id }).lean();
};
