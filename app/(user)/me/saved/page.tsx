import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ExperienceList from "@/components/Experience/ExperienceList";
import Link from "next/link";

export default async function SavedPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return (
      <div className="p-10 text-center text-red-500">
        Unauthorized
      </div>
    );
  }

  const page = Number(searchParams.page) || 1;

  const res = await fetch(
    `${process.env.BASE_URL}/api/saved?userId=${session.user._id}&page=${page}`,
    { cache: "no-store" }
  );

  const result = await res.json();

  if (!result.success) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load saved posts
      </div>
    );
  }

  const data = result.data;

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER (Same style as your /me/posts) */}
      <div className="max-w-6xl mx-auto px-4 pt-6">

        <Link
          href="/me"
          className="text-sm text-primary hover:underline"
        >
          ← Back to profile
        </Link>

        <h1 className="text-2xl font-bold mt-2">
          Saved Posts
        </h1>

        <p className="text-sm text-muted-foreground">
          All your bookmarked interview experiences
        </p>
      </div>

      {/* 🔥 LIST */}
      <ExperienceList
        cards={data.experiences}
        page={data.pagination.page}
        totalPages={data.pagination.totalPages}
        title="All Saved Posts"
        subtitle={`${data.pagination.total} saved`}
        showFilters={false}
      />

    </div>
  );
}