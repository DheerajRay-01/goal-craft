import mongoose, { Schema } from "mongoose"

const roundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
)

const resourceSchema = new Schema(
  {
    fileName: {
      type: String
    },

    url: {
      type: String
    },
    fileType:{
      type: String
    }
  },
  { _id: false }
)

const experienceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    role: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    location: {
      type: String,
      trim: true
    },

    employmentType: {
      type: String,
      enum: ["Internship", "Full Time", "Part Time", "Contract"],
      index: true
    },

    experienceLevel: {
      type: String,
      enum: ["Student", "Fresher", "1-2 Years", "2+ Years"],
      index: true
    },

    interviewDate: {
      type: Date
    },

    rounds: [roundSchema],

    skills: [
      {
        type: String,
        trim: true,
        index: true
      }
    ],

    overallExperience: {
      type: String,
      required: true,
      trim: true
    },

    questions: [
      {
        type: String,
        trim: true
      }
    ],

    resources: [resourceSchema],

    helpfulVotes: {
      type: Number,
      default: 0
    },

    helpfulUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    },

    slug: {
      type: String,
      unique: true
    }

  },
  {
    timestamps: true
  }
)

/* Important indexes for filtering */

experienceSchema.index({ companyName: 1, role: 1 })
experienceSchema.index({ createdAt: -1 })

export default mongoose.models.Experience ||
  mongoose.model("Experience", experienceSchema)