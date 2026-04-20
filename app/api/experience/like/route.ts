import { NextRequest } from "next/server";

import { apiResponse } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import experienceModel from "@/models/experience.model";
import userModel from "@/models/user.model";


export async function POST(req:NextRequest) {
  try {
    const { experienceId } = await req.json();

    
    
    if (!experienceId) {
        return apiResponse(false, "Experience ID required", 400);
    }
    
    const session = await getServerSession(authOptions);
    
    
    
    if (!session || !session.user) {
        return apiResponse(false, "Unauthorized", 401);
    }
    
    const userId = session.user._id;
    
    const experience = await experienceModel.findById(experienceId);
    
    console.log(experience);
    
    
    if (!experience) {
        return apiResponse(false, "Experience not found", 404);
    }
    const alreadyMarked = await experienceModel.exists({
  _id: experienceId,
  helpfulUsers: userId,
});

if (alreadyMarked) {
  await experienceModel.findByIdAndUpdate(experienceId, {
    $pull: { helpfulUsers: userId },
    $inc: { helpfulVotes: -1 },
  });

    await userModel.findByIdAndUpdate(userId, {
        $pull: { likedPosts: experienceId },
      });
} else {
  await experienceModel.findByIdAndUpdate(experienceId, {
    $addToSet: { helpfulUsers: userId },
    $inc: { helpfulVotes: 1 },
  });
  await userModel.findByIdAndUpdate(userId, {
        $addToSet: { likedPosts: experienceId },
      });
}

    return apiResponse(true, "Updated", 200, {
      helpful: !alreadyMarked,
      helpfulVotes: experience.helpfulVotes,
    });
  } catch (error) {
    console.log(error);
    return apiResponse(false, "Server Error", 500);
  }
}