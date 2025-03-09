import { UserRole } from "@/models/user.model";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().toLowerCase().trim().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, {
      message: "Password must be at most 32 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
  role: z.nativeEnum(UserRole, {
    message: "User role should be customer, restaurant, delivery or admin",
  }),
});
