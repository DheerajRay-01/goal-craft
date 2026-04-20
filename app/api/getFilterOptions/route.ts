import connectDB from "@/lib/db/connectDB";
import Experience from "@/models/experience.model";
import { apiResponse } from "@/lib/apiResponse";

export async function GET() {
  try {
    await connectDB();

    const [
      company,
      role,
      skills,
      location,
      interviewRound,
    ] = await Promise.all([
      Experience.distinct("companyName", {
        status: "published",
      }),
      Experience.distinct("role", {
        status: "published",
      }),
      Experience.distinct("skills", {
        status: "published",
      }),
      Experience.distinct("location", {
        status: "published",
      }),
      Experience.distinct("rounds.roundName", {
        status: "published",
      }),
    ]);

    const filterOptions = {
      company: company.sort(),
      role: role.sort(),
      skills: skills.sort(),
      location: location.sort(),

      experienceLevel: [
        "Student",
        "Fresher",
        "Experienced",
      ],

      employmentType: [
        "Internship",
        "Full Time",
        "Contract",
        "Part Time",
      ],

      interviewRound: interviewRound.sort(),
    };

    console.log(filterOptions);
    

    return apiResponse(
      true,
      "Filter options fetched successfully",
      200,
      filterOptions
    );
  } catch (error) {
    console.error(error);

    return apiResponse(
      false,
      "Failed to fetch filter options",
      500
    );
  }
}