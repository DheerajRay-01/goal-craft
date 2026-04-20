import connectDB from "@/lib/db/connectDB";
import experienceModel from "@/models/experience.model";
import { apiResponse } from "@/lib/apiResponse";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

/* GET SINGLE EXPERIENCE */

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
try {
    await connectDB();

    const experience = await experienceModel
      .findOne({ slug })
      .populate("user", "_id fullName username")
      .lean();

    if (!experience) {
      return apiResponse(false, "Experience not found", 404);
    }

    return apiResponse(true, "Fetched successfully", 200, experience);

  } catch (error) {
    console.error(error);
    return apiResponse(false, "Internal server error", 500);
  }
}

/* DELETE EXPERIENCE */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {

    const { slug } = await context.params; // ✅ IMPORTANT FIX

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(false, "Unauthorized", 401);
    }

    await connectDB();

    const experience = await experienceModel.findOne({ slug });

    if (!experience) {
      return apiResponse(false, "Experience not found", 404);
    }

    // owner check
    if (experience.user.toString() !== session.user._id) {
      return apiResponse(false, "Forbidden", 403);
    }

    await experienceModel.deleteOne({ _id: experience._id });

    return apiResponse(true, "Experience deleted successfully", 200);

  } catch (error) {
    console.error(error);
    return apiResponse(false, "Internal server error", 500);
  }
}
/* UPDATE EXPERIENCE */

export async function PATCH(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    console.log("hello");
    
     const { slug } = await context.params; 

     console.log("slug",slug);
     
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(false, "Unauthorized", 401);
    }

    await connectDB();

    const experience = await experienceModel.findOne({slug});

    if (!experience) {
      return apiResponse(false, "Experience not found", 404);
    }

    /* owner check */

    if (experience.user.toString() !== session.user._id) {
      return apiResponse(false, "Forbidden", 403);
    }

    const body = await req.json();


     const questions = body.questions?.map((q: any) => q.value);

    const skills = body.skills?.map((q: any) => q.value);

    const updated = await experienceModel.findOneAndUpdate(
      { slug},
      {...body,questions,skills},
      { new: true },
    );

    return apiResponse(true, "Experience updated successfully", 200, updated);
  } catch (error) {
    console.error(error);

    return apiResponse(false, "Internal server error", 500);
  }
}
