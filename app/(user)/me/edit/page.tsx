import EditProfileForm from "@/components/user/EditProfileForm"
import connectDB from "@/lib/db/connectDB"
import userModel from "@/models/user.model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { UserService } from "@/lib/services/user.service"

export default async function EditProfilePage() {

  const session = await getServerSession(authOptions)

 if (!session?.user?._id) {
    return <div className="p-6 text-center">Unauthorized</div>
  }

  const user = await UserService.getById(session.user._id)


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <EditProfileForm user={user} />
    </div>
  )
}