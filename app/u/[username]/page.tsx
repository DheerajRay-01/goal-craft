import Link from "next/link";

interface Props {
  params: {
    username: string;
  };
}

const Page = async ({ params }: Props) => {
  const { username } = await params;

  const res = await fetch(
    `${process.env.BASE_URL}/api/user/${username}`,
    { cache: "no-store" }
  );

  const result = await res.json();

  if (!result.success) {
    return (
      <div className="p-16 text-center text-red-500">
        User not found
      </div>
    );
  }

  const user = result.data;

  const totalHelpful = user.createdPosts.reduce(
    (acc: number, post: any) => acc + (post.helpfulVotes || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* 🔥 HERO */}
      <div className="rounded-2xl border border-[#dbeafe] bg-gradient-to-b from-white to-[#f0f9ff] p-8 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT */}
          <div className="flex gap-5">
            <div className="h-20 w-20 rounded-full bg-[#e0f2fe] flex items-center justify-center text-2xl font-bold text-primary border">
              {user.fullName?.charAt(0)}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {user.fullName}
              </h1>

              <p className="text-sm text-primary font-medium">
                @{user.username}
              </p>

              <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#e0f2fe] text-primary">
                {user.userCategory}
              </span>

              {user.bio && (
                <p className="text-sm text-muted-foreground max-w-md">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* STATS */}
          <div className="flex gap-8 text-center">
            <div>
              <p className="text-xl font-bold text-primary">
                {user.createdPosts.length}
              </p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>

            <div>
              <p className="text-xl font-bold text-primary">
                {user.likedPosts.length}
              </p>
              <p className="text-xs text-muted-foreground">Liked</p>
            </div>

            <div>
              <p className="text-xl font-bold text-primary">
                {totalHelpful}
              </p>
              <p className="text-xs text-muted-foreground">Helpful</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 EDUCATION */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Education</h2>

        {user.education?.university ? (
          <div className="rounded-xl border border-[#dbeafe] bg-[#f0f9ff] p-5">
            <p className="font-semibold">
              {user.education.university}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.education.degree} • {user.education.branch}
            </p>
            <p className="text-sm text-muted-foreground">
              Graduation: {user.education.graduationYear}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No education added
          </p>
        )}
      </div>

      {/* 🔥 EXPERIENCE */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Experience</h2>

        {user.experiences.length > 0 ? (
          <div className="space-y-4">
            {user.experiences.map((exp: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-[#dbeafe] bg-white p-5 hover:shadow-sm transition"
              >
                <p className="font-semibold">
                  {exp.jobTitle}
                </p>

                <p className="text-sm text-muted-foreground">
                  {exp.companyName} • {exp.location}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {exp.startDate?.slice(0, 10)} -{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : exp.endDate?.slice(0, 10)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No experience added
          </p>
        )}
      </div>

      {/* 🔥 POSTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
         Interview Experiences
        </h2>

        {user.createdPosts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No posts yet
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {
            user.createdPosts.slice(0, 4).map((post: any) => (
           <Link
  key={post._id}
  href={`/experiences/${post.slug}`}
  className="group"
>
  <div className="h-full rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-5 
    transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300">

    {/* HEADER */}
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition">
        {post.companyName}
      </h3>

      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
        {post.role || "Role"}
      </span>
    </div>

    {/* ROLE */}
    <p className="text-sm text-gray-500 mt-1">
      {post.role}
    </p>

    {/* DESCRIPTION */}
    <p className="mt-3 text-sm text-gray-600 line-clamp-3">
      {post.overallExperience || "No description provided"}
    </p>

    {/* FOOTER */}
    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
      <span className="flex items-center gap-1">
        👍 <span className="font-medium text-gray-700">
          {post.helpfulVotes || 0}
        </span>
      </span>

      <span>
        {new Date(post.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>

  </div>
</Link>
            ))}

          </div>
          
        )}
        <div className="flex justify-center mt-6">
  <Link
    href={`/u/${user.username}/posts`}
    className="px-5 py-2 text-sm font-medium rounded-lg border border-blue-200 
    bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
  >
    View All Posts →
  </Link>
</div>
      </div>

    </div>
  );
};

export default Page;