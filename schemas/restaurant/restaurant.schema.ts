import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  cuisineType: z.string({
    required_error: "Cuisine type is required",
    invalid_type_error: "Cuisine type must be a string",
  }),
  addressLine1: z.string({
    required_error: "Address line 1 is required",
    invalid_type_error: "Address line 1 must be a string",
  }),
  addressLine2: z
    .string({
      invalid_type_error: "Address line 2 must be a string",
    })
    .optional(),
  contactNumber: z.string({
    required_error: "Contact number is required",
    invalid_type_error: "Contact number must be a string",
  }),

  openingHours: z.object({
    open: z
      .string({
        required_error: "Opening hours are required",
        invalid_type_error: "Opening hours must be a string",
      })
      .toUpperCase(),
    close: z
      .string({
        required_error: "Closing hours are required",
        invalid_type_error: "Closing hours must be a string",
      })
      .toUpperCase(),
  }),
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
