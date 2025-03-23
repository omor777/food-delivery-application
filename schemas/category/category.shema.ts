import { z } from "zod";
import mongoose from "mongoose";

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .min(3, "Category name must be at least 3 characters long"),
  parentId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid parent category ID",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Category description must be a string",
    })
    .optional(),
  image: z
    .string({
      required_error: "Category image is required",
      invalid_type_error: "Category image must be a string",
    })
    .optional(),
});
