import connectDB from "@/lib/db/connectDB";
import userModel from "@/models/user.model";
import experienceModel from "@/models/experience.model";
import ExperienceList from "@/components/Experience/ExperienceList";
import Link from "next/link";

const Page = async ({ params, searchParams }: any) => {
  await connectDB();

  const { username } = await params;

  // ✅ find user
  const user = await userModel.findOne({ username });

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500">
        User not found
      </div>
    );
  }

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

  // ✅ fetch posts
  const posts = await experienceModel
    .find({ user: user._id, status: "published" })
    .populate("user", ["fullName", "username"])
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await experienceModel.countDocuments({
    user: user._id,
    status: "published",
  });

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href={`/u/${username}`}
          className="text-sm text-primary hover:underline"
        >
          ← Back to profile
        </Link>

        <h1 className="text-2xl font-bold mt-2">
          @{username}'s Experiences
        </h1>

        <p className="text-sm text-muted-foreground">
          All interview experiences shared by this user
        </p>
      </div>

      {/* 🔥 LIST */}
      <ExperienceList
        cards={posts}
        page={page}
        totalPages={Math.ceil(total / limit)}
        filterOptions={{}}
        title={`@${username}'s Posts`}
        subtitle={`${posts.length} results`}
        user={user._id.toString()}
      />
    </div>
  );
};

export default Page;