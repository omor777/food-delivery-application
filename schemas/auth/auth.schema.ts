import { UserRole } from "@/models/user.model";
import { z } from "zod";

export const registerSchema = z.object({
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

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .toLowerCase()
    .trim()
    .min(1, "Email is required")
    .email("Invalid Email"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof signInSchema>;
