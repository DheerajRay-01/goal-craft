import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db/connectDB";
import { apiResponse } from "@/lib/apiResponse";
import User from "@/models/user.model";
import "@/models/experience.model";
import SavedPost from "@/models/savedPost.model";


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // ✅ check missing
    if (!userId) {
      return apiResponse(false, "UserId is required", 400);
    }

    // ✅ validate ObjectId (IMPORTANT)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return apiResponse(false, "Invalid UserId", 400);
    }

    console.log("userId:", userId);

    let user = await User.findById(userId)
      .populate({
        path: "createdPosts",
        options: {
          sort: { createdAt: -1 }, // latest
          limit: 3, // 🔥 top 3 posts
        },
        select:
          "companyName role overallExperience helpfulVotes createdAt slug",
      })
      .select("-password")
      .lean();

    // ✅ user not found
    if (!user) {
      console.log("❌ user not found");
      return apiResponse(false, "User not found", 404);
    }


const savedPosts = await SavedPost.find({ userId })
  .populate({
    path: "postId",
    select:
      "companyName role overallExperience helpfulVotes createdAt slug",
  })
  .sort({ createdAt: -1 })
  .limit(3)
  .lean();




 const formattedSavedPosts = savedPosts
  .map((s) => s.postId)
  .filter(Boolean);

  user = {
  ...user,
  savedPosts: formattedSavedPosts,
};


        console.log("✅ user fetched complete",user);
  

    return apiResponse(true, "User fetched", 200, user);
  } catch (error: any) {
    console.error("GET USER ERROR:", error);

    return apiResponse(
      false,
      error.message || "Failed to fetch user",
      500
    );
  }
}