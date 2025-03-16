import Profile, { IProfile } from "@/models/profile.model";
import { Types } from "mongoose";

export const createProfile = async (userId: Types.ObjectId) => {
  const profile: IProfile = new Profile({
    user: userId,
  });

  return (await profile.save()).toObject();
};
