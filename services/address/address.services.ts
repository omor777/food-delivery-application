import Address, { IAddress } from "@/models/address.model";
import { Types } from "mongoose";

export const createAddress = async (userId: Types.ObjectId) => {
  const address: IAddress = new Address({
    user: userId,
  });

  return (await address.save()).toObject();
};
