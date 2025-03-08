import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "customer" | "restaurant" | "delivery" | "admin";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "customer" | "restaurant" | "delivery" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "customer" | "restaurant" | "delivery" | "admin";
  }
}
