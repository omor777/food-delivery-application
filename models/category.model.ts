import mongoose, { model, models, Schema } from "mongoose";

export interface ICategory {
  _id?: mongoose.Types.ObjectId;
  name: string;
  restaurantId: mongoose.Types.ObjectId;
  description?: string;
  image?: string;
  parentId?: mongoose.Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

const Category =
  models.Category ?? model<ICategory>("Category", categorySchema);

export default Category;
