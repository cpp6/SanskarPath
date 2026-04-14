import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema(
  {
    childId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    usageTime: { 
      type: Number, 
      required: true,
      default: 0
    },
    date: { 
      type: Date, 
      required: true 
    },
  },
  { timestamps: true }
);

// Index for faster queries on childId and date
ActivityLogSchema.index({ childId: 1, date: -1 });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);
