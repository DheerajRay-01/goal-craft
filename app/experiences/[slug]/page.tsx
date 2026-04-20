import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ExperienceDetail from "@/components/Experience/ExperienceDetail";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {

  const { slug } = await params; // ✅ no await

  // ✅ API call
  const res = await fetch(
    `${process.env.BASE_URL}/api/experience/${slug}`,
    { cache: "no-store" }
  );

  const result = await res.json();

  if (!result.success) {
    return (
      <p className="text-center mt-10 text-red-500">
        Experience not found
      </p>
    );
  }

  const post = result.data;


  console.log(post);
  

  const session = await getServerSession(authOptions);

  const isOwner =
    session?.user?._id?.toString() === post?.user?._id?.toString();

  return (
    <ExperienceDetail
      post={post}
      isOwner={isOwner}
    />
  );
}