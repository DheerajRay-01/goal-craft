import mongoose, { Schema } from "mongoose";

const savedPostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate saves for same user-post pair
savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost =
  mongoose.models.SavedPost ||
  mongoose.model("SavedPost", savedPostSchema);

export default SavedPost;