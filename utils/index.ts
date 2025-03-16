import { NextRequest } from "next/server";

export const checkContentType = (req: NextRequest): boolean => {
  return req.headers.get("content-type") === "application/json" ? true : false;
};
