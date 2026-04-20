import connectDB from "@/lib/db/connectDB"
import experienceModel from "@/models/experience.model"

export const ExperienceService = {

  async getBySlug(slug: string) {

    await connectDB()

    const experience = await experienceModel
      .findOne({ slug })
      .populate("user", "_id fullName email")
      .lean()

    console.log(experience);
    

    return experience
  },

  async getAll() {

    await connectDB()

    return experienceModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
  },

  async getByUser(userId: string) {

    await connectDB()

    return experienceModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .lean()
  },

  async deleteBySlug(slug: string) {

    await connectDB()

    return experienceModel.deleteOne({ slug })
  }

}