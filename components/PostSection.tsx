import connectDB from "@/lib/db/connectDB";
import Experience from "@/models/experience.model";
import SavedPost from "@/models/savedPost.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostTabs from "./PostTabs";

export default async function PostsSection() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-center py-20">
        Please login to view posts
      </div>
    );
  }

  const userId = session.user._id;

  // 🔥 ALL POSTS
  const allPosts = await Experience.find({})
    .sort({ createdAt: -1 })
    .lean();

  // 🔥 SAVED POSTS
  const saved = await SavedPost.find({ userId });

  const savedIds = saved.map((item) => item.postId);

  const savedPosts = await Experience.find({
    _id: { $in: savedIds },
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <PostTabs allPosts={allPosts} savedPosts={savedPosts} />
      </div>
    </section>
  );
}