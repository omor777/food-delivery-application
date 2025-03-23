import dbConnect from "@/lib/db";
import { errorResponse } from "@/utils/nextResponse";

export async function POST() {
  await dbConnect();
  try {

    

  } catch (error) {
    console.error("Create Menu Item Error: ", error);
    return errorResponse("Internal Server Error", 500);
  }
}
