import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  employmentType: {
    type: String,
    enum: ["Internship", "Full Time", "Part Time", "Contract"],
  },
  location: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
});

const educationSchema = new mongoose.Schema({
  university: {
    type: String,
  },
  degree: {
    type: String,
  },
  branch: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    userCategory: {
      type: String,
      enum: ["Student", "Fresher", "Professional"],
    },

    bio: {
      type: String,
    },

    avatar: {
      type: String,
    },

    education: educationSchema,

    experiences: [experienceSchema],

    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],

    createdPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);