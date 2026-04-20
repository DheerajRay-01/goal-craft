import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db/connectDB";
import SavedPost from "@/models/savedPost.model";
import "@/models/experience.model";
import Experience from "@/models/experience.model";
import { apiResponse } from "@/lib/apiResponse";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const sort = searchParams.get("sort") || "newest";

    if (!userId) {
      return apiResponse(false, "UserId is required", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return apiResponse(false, "Invalid UserId", 400);
    }

    const skip = (page - 1) * limit;

    // 🔥 SORT OPTIONS
    const sortMap: Record<string, any> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostHelpful: { helpfulVotes: -1 },
    };

    const sortOptions = sortMap[sort] || sortMap.newest;

    // ✅ Step 1: Get saved posts (with pagination)
    const saved = await SavedPost.find({ userId })
      .sort({ createdAt: -1 }) // 🔥 recently saved first
      .skip(skip)
      .limit(limit)
      .lean();

    const postIds = saved.map((s) => s.postId);

    // ✅ Step 2: Fetch actual posts
    const experiences = await Experience.find({
      _id: { $in: postIds },
      status: "published",
    })
      .populate("user", ["fullName", "username"])
      .sort(sortOptions)
      .lean();

    // 🔥 Maintain order (VERY IMPORTANT)
    const orderedExperiences = postIds.map((id) =>
      experiences.find((e) => e._id.toString() === id.toString())
    ).filter(Boolean);

    // ✅ Total count
    const total = await SavedPost.countDocuments({ userId });

    return apiResponse(true, "Saved posts fetched", 200, {
      experiences: orderedExperiences,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("SAVED API ERROR:", error);

    return apiResponse(false, "Failed to fetch saved posts", 500);
  }
}