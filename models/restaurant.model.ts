import { models, model, Schema, Document, Types } from "mongoose";

export interface IRestaurant extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  owner: Types.ObjectId;
  cuisineType: string;
  addressLine1: string;
  addressLine2?: string;
  contactNumber: string;
  rating?: number;
  totalReviews?: number;
  openingHours: {
    open: string;
    close: string;
  };
  status: "pending" | "approved" | "rejected";
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    cuisineType: {
      type: String,
      required: [true, "Cuisine type is required"],
    },
    addressLine1: {
      type: String,
      required: [true, "Address line 1 is required"],
    },
    addressLine2: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    openingHours: {
      open: {
        type: String,
        required: [true, "Opening hours are required"],
      },
      close: {
        type: String,
        required: [true, "Closing hours are required"],
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Restaurant =
  models.Restaurant ?? model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
