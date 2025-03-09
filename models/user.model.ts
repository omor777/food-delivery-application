import mongoose, { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  CUSTOMER = "customer",
  RESTAURANT = "restaurant",
  DELIVERY = "delivery",
  ADMIN = "admin",
}
export interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.CUSTOMER,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    // Type-narrowing with pattern matching
    if (error instanceof Error) {
      // Handle specific error messages if needed
      if (error.message.includes("salt")) {
        return next(new Error("Error generating salt for password encryption"));
      } else if (error.message.includes("hash")) {
        return next(new Error("Error hashing password"));
      }

      // Generic bcrypt error
      return next(new Error(`Password encryption error: ${error.message}`));
    }

    // Fallback for unknown error types
    return next(new Error("Unknown error during password encryption"));
  }
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
