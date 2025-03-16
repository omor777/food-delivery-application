import User, { IUser } from "@/models/user.model";
import { RegisterSchema } from "@/schemas/auth/auth.schema";

export const createUser = async (
  data: RegisterSchema
): Promise<Pick<IUser, "_id" | "email" | "role" | "password">> => {
  const user: IUser = new User({
    email: data.email,
    password: data.password,
    role: data.role,
  });

  return (await user.save()).toObject();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
