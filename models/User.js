import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true }, // For parents
    role: { 
      type: String, 
      enum: ["parent", "admin", "child"], 
      default: "parent" 
    },
    
    // Parent-Child linking
    parentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    
    // Child specific fields
    ageGroup: {
      type: String,
      enum: ["4-6", "7-9", "10-12", "13+"],
    },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [
      {
        id: String,
        name: String,
        icon: String,
        earnedAt: { type: Date, default: Date.now },
      },
    ],
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    screenTimeLimit: { type: Number, default: 60 }, // in minutes
    currentScreenTime: { type: Number, default: 0 }, // in minutes
    isLocked: { type: Boolean, default: false },
    completedVideoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
