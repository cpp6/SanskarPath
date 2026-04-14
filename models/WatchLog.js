import mongoose from "mongoose";

const WatchLogSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    watchedAt: {
      type: Date,
      default: Date.now,
    },
    pointsAwarded: {
      type: Number,
      default: 5,
    },
    durationMinutes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WatchLog || mongoose.model("WatchLog", WatchLogSchema);
