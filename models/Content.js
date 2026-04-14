import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    ageGroup: {
      type: String,
      enum: ["4-6", "7-9", "10-12", "13+"],
      required: true,
    },
    approved: { type: Boolean, default: true }, // Defaulting to true for now since admin dashboard will handle it
    xpReward: { type: Number, default: 5 }, // Fixed 5 points per video as per spec
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
