import { apiResponse } from "@/lib/apiResponse";
import connectDB from "@/lib/db/connectDB";
import userModel from "@/models/user.model";
import { NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await connectDB();

    const {username} = await context.params

    const user = await userModel
      .findOne({ username })
      .select("-password -__v")
      .populate("createdPosts", "companyName role slug helpfulVotes createdAt overallExperience")
      .populate("likedPosts", "companyName role slug helpfulVotes");

    if (!user) {
      return apiResponse(false, "User not found", 404);
    }

    console.log(user);
    

    return apiResponse(true, "User fetched", 200, user);
  } catch (error) {
    console.log(error);
    return apiResponse(false, "Server error", 500);
  }
}