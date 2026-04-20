
import { ExperienceService } from "@/lib/services/experience.service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import ExperienceDetail from "@/components/Experience/ExperienceDetail"

export default async function Page({ params }: any) {

  const { slug } = await params

  const post = await ExperienceService.getBySlug(slug)

  const serializedPost = JSON.parse(JSON.stringify(post))

  const session = await getServerSession(authOptions)

  console.log(serializedPost);
  

  const isOwner =
    session?.user?._id?.toString() === post?.user?._id?.toString()

  return (
    <ExperienceDetail
      post={serializedPost}
      isOwner={isOwner}
    />
  )
}