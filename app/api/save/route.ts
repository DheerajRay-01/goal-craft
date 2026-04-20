import connectDB from "@/lib/db/connectDB";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import { apiResponse } from "@/lib/apiResponse";

import SavedPost from "@/models/savedPost.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(
        false,
        "Unauthorized",
        401
      );
    }

    const { postId } = await req.json();

    if (!postId) {
      return apiResponse(
        false,
        "Post ID is required",
        400
      );
    }

    const userId = session.user._id;

    const existingSavedPost =
      await SavedPost.findOne({
        userId,
        postId,
      });

    if (existingSavedPost) {
      await SavedPost.findByIdAndDelete(
        existingSavedPost._id
      );

      return apiResponse(
        true,
        "Post Unsaved Successfully",
        200,
        { saved: false }
      );
    }

    await SavedPost.create({
      userId,
      postId,
    });

    return apiResponse(
      true,
      "Post Saved Successfully",
      200,
      { saved: true }
    );
  } catch (error) {
    console.error(
      "Toggle Save Error:",
      error
    );

    return apiResponse(
      false,
      "Failed to Toggle Save",
      500
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(
        false,
        "Unauthorized",
        401
      );
    }

    const { searchParams } = new URL(req.url);

    const postId =
      searchParams.get("postId");

    if (!postId) {
      return apiResponse(
        false,
        "Post ID is required",
        400
      );
    }

    const userId = session.user._id;

    const existingSavedPost =
      await SavedPost.findOne({
        userId,
        postId,
      });

    return apiResponse(
      true,
      "Saved status fetched",
      200,
      {
        isSaved: !!existingSavedPost,
      }
    );
  } catch (error) {
    console.error(
      "Check Save Status Error:",
      error
    );

    return apiResponse(
      false,
      "Failed to fetch saved status",
      500
    );
  }
}