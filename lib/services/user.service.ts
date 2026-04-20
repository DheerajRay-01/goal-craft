import connectDB from "@/lib/db/connectDB"
import userModel from "@/models/user.model"

export const UserService = {

  async getById(userId: string) {

    await connectDB()

    return userModel
      .findById(userId)
      .lean()
  },

  async updateProfile(userId: string, data: any) {

    await connectDB()

    return userModel.findByIdAndUpdate(
      userId,
      data,
      { new: true }
    ).lean()
  }

}