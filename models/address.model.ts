import mongoose, { model, Schema, models, Document } from "mongoose";

type Location = {
  type?: "Point";
  coordinates?: [number, number];
};
export interface IAddress extends Document {
  _id: mongoose.Types.ObjectId;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  label?: string;
  user: mongoose.Types.ObjectId;
  isDefault?: boolean;
  location?: Location;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    addressLine1: {
      type: String,
      required: false,
      default: "",
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },

    label: {
      type: String,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      enum: ["Point"],
      coordinates: [Number, Number],
    },
  },
  { timestamps: true }
);

const Address = models.Address ?? model<IAddress>("Address", addressSchema);

export default Address;
