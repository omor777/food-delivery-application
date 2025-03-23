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

export const updateRestaurantSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .optional(),
  cuisineType: z
    .string({
      invalid_type_error: "Cuisine type must be a string",
    })
    .optional(),
  addressLine1: z
    .string({
      invalid_type_error: "Address line 1 must be a string",
    })
    .optional(),
  addressLine2: z
    .string({
      invalid_type_error: "Address line 2 must be a string",
    })
    .optional(),
  contactNumber: z
    .string({
      required_error: "Contact number is required",
      invalid_type_error: "Contact number must be a string",
    })
    .optional(),
  openingHours: z
    .object({
      open: z
        .string({
          invalid_type_error: "Opening hours must be a string",
        })
        .toUpperCase()
        .optional(),
      close: z
        .string({
          invalid_type_error: "Closing hours must be a string",
        })
        .toUpperCase()
        .optional(),
    })
    .optional(),
});

export const restaurantQuerySchema = z.object({
  page: z
    .string({
      invalid_type_error: "Page number must be a number",
    })
    .default("1")
    .transform(Number)
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Page number must be a positive integer",
    }),
  limit: z
    .string({
      invalid_type_error: "Limit must be a number",
    })
    .default("10")
    .transform(Number)
    .refine((val) => Number.isInteger(val) && val > 0 && val <= 100, {
      message: "Limit must be a positive integer between 1 and 100",
    }),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  sortBy: z.enum(["createdAt", "name", "status"]).default("createdAt"),
  sortType: z.enum(["asc", "desc"]).default("asc"),
});

export type RestaurantQuery = z.infer<typeof restaurantQuerySchema>;

export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
