import connectDB from "@/lib/db/connectDB";
import Experience from "@/models/experience.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import slugify from "slugify";
import { apiResponse } from "@/lib/apiResponse";
import {customAlphabet } from 'nanoid'
import userModel from "@/models/user.model";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return apiResponse(false,"Unauthorized",401)
    }

    await connectDB();

    const body = await req.json();

    console.log("body",body);
    

    /* Transform questions */

    const questions = body.questions?.map((q: any) => q.value);

    const skills = body.skills?.map((q: any) => q.value);

    /* Generate slug */

   const nanoidNumber = customAlphabet("0123456789", 6);

const slug = slugify(
  `${body.companyName}-${body.role}-${nanoidNumber()}`,
  {
    lower: true,
    strict: true,
    trim: true,
  }
);
    

    const experience = await Experience.create({
      user: session.user._id,
      companyName: body.companyName,
      role: body.role,
      location: body.location,
      employmentType: body.employmentType,
      experienceLevel: body.experienceLevel,
      interviewDate: body.interviewDate ? new Date(body.interviewDate) : null,
      rounds: body.rounds,
      skills,
      overallExperience: body.overallExperience,
      questions,
      resources: body.resources || [],
      status: body.status || "published",
      slug,
    });


    console.log("experience",experience);
    

    await userModel.findByIdAndUpdate(session.user._id, {
  $push: { createdPosts: experience._id },
});

    return apiResponse(true,"Experience created successfully",200,experience)
  } catch (error) {
    console.error(error);

    return apiResponse(false,"Failed to create Experience",501)
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const sort = searchParams.get("sort") || "newest";

    const company = searchParams.get("company");
    const role = searchParams.get("role");
    const skills = searchParams.get("skills");
    const location = searchParams.get("location");
    const experienceLevel = searchParams.get("experienceLevel");
    const employmentType = searchParams.get("employmentType");
    const interviewRound = searchParams.get("interviewRound");

    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {
      status: "published",
    };

    if (company) {
      filter.companyName = { $in: company.split(",") };
    }

    if (role) {
      filter.role = { $in: role.split(",") };
    }

    if (skills) {
      filter.skills = { $in: skills.split(",") };
    }

    if (location) {
      filter.location = { $in: location.split(",") };
    }

    if (experienceLevel) {
      filter.experienceLevel = { $in: experienceLevel.split(",") };
    }

    if (employmentType) {
      filter.employmentType = { $in: employmentType.split(",") };
    }

    if (interviewRound) {
      filter["rounds.roundName"] = {
        $in: interviewRound.split(","),
      };
    }

    const sortMap: Record<string, any> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostHelpful: { helpfulVotes: -1 },
      latestInterview: { interviewDate: -1 },
    };

    const sortOptions = sortMap[sort] || sortMap.newest;

    const experiences = await Experience.find(filter)
      .populate("user", ["fullName","username"])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Experience.countDocuments(filter);

    console.log(experiences[0].resources);
    

    return apiResponse(true, "Fetched successfully", 200, {
      experiences,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return apiResponse(false, "Failed to fetch experiences", 500);
  }
}