import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { apiResponse } from "@/lib/apiResponse";
import connectDB from "@/lib/db/connectDB";
import experienceModel from "@/models/experience.model";
import { log } from "console";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ FIX: use next-auth/next version
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(false, "Unauthorized", 401);
    }

    const userId = session.user._id;

    console.log(session);
    

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 9;
    const sort = searchParams.get("sort") || "newest";

    const skip = (page - 1) * limit;

    // ✅ FILTER
    const filter: any = {
      user: userId,
      status: "published",
    };

    // ✅ SORT MAP
    const sortMap: Record<string, any> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostHelpful: { helpfulVotes: -1 },
      latestInterview: { interviewDate: -1 },
    };

    const sortOptions = sortMap[sort] || sortMap.newest;

    // ✅ QUERY
    const experiences = await experienceModel
      .find(filter)
      .populate("user", ["fullName", "username"])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await experienceModel.countDocuments(filter);

    return apiResponse(true, "Fetched successfully", 200, {
      posts: experiences,
      page,
      totalPages: Math.ceil(total / limit),
      filters: {},
    });

  } catch (error) {
    console.error(error);
    return apiResponse(false, "Failed to fetch posts", 500);
  }
}