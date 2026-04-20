import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/db/connectDB";
import experienceModel from "@/models/experience.model";
import ExperienceList from "@/components/Experience/ExperienceList";
import Link from "next/link";

const Page = async ({ searchParams }: any) => {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return (
      <div className="p-10 text-center text-red-500">
        Unauthorized
      </div>
    );
  }

  const userId = session.user._id;

  // ✅ pagination
  const page = Number(searchParams.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  // ✅ sorting
  const sort = searchParams.sort || "newest";

  const sortMap: Record<string, any> = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    mostHelpful: { helpfulVotes: -1 },
    latestInterview: { interviewDate: -1 },
  };

  const sortOptions = sortMap[sort] || sortMap.newest;

  // ✅ DB query
  const posts = await experienceModel
    .find({ user: userId, status: "published" })
    .populate("user", ["fullName", "username"])
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await experienceModel.countDocuments({
    user: userId,
    status: "published",
  });

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/me"
          className="text-sm text-primary hover:underline"
        >
          ← Back to profile
        </Link>

        <h1 className="text-2xl font-bold mt-2">
          My Experiences
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage and explore all your interview experiences
        </p>
      </div>

      {/* 🔥 LIST */}
      <ExperienceList
        cards={posts}
        page={page}
        totalPages={Math.ceil(total / limit)}
        filterOptions={{}}
        title="All My Posts"
        subtitle={`${posts.length} results`}
        user={userId}
      />
    </div>
  );
};

export default Page;