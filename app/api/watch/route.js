import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Content from "@/models/Content";
import WatchLog from "@/models/WatchLog";
import { authenticateRequest } from "@/lib/auth";

export async function POST(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded || decoded.role !== "child") {
      return NextResponse.json({ error: "Unauthorized. Child access only." }, { status: 401 });
    }

    await dbConnect();
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const video = await Content.findById(videoId);
    if (!video) {
       return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const existingLog = await WatchLog.findOne({ 
      childId: decoded.userId, 
      videoId: videoId 
    });

    if (existingLog) {
       return NextResponse.json({ message: "Already watched, no points awarded.", alreadyWatched: true });
    }

    const points = 5;
    
    await WatchLog.create({
      childId: decoded.userId,
      videoId: videoId,
      pointsAwarded: points
    });

    const childUser = await User.findById(decoded.userId);
    const oldXP = childUser.xp || 0;
    const newXP = oldXP + points;
    
    const newBadges = [...(childUser.badges || [])];
    const milestoneLevel = Math.floor(newXP / 100);
    const prevMilestoneLevel = Math.floor(oldXP / 100);
    
    let specialBadge = null;
    if (milestoneLevel > prevMilestoneLevel) {
       const xpMark = milestoneLevel * 100;
       
       let badgeInfo = {
          name: `Badge of Honor (${xpMark} Points)`,
          icon: "🎖️"
       };

       // Specific Sanskar Milestones
       if (xpMark === 100) {
          badgeInfo = { name: "Sanjeev (The Awakened One)", icon: "🪔" };
       } else if (xpMark === 200) {
          badgeInfo = { name: "Dhairyavan (The Patient One)", icon: "🛡️" };
       } else if (xpMark === 500) {
          badgeInfo = { name: "Sanskar Pathik", icon: "🏔️" };
       }

       specialBadge = {
         id: `milestone_${xpMark}`,
         ...badgeInfo,
         earnedAt: new Date()
       };
       newBadges.push(specialBadge);
    }

    const updatedChild = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        $inc: { xp: points },
        $push: { completedVideoIds: videoId },
        $set: { badges: newBadges }
      },
      { new: true }
    );

    return NextResponse.json({ 
      message: "Points awarded successfully!", 
      pointsAwarded: points,
      totalXP: updatedChild.xp,
      badgeEarned: milestoneLevel > prevMilestoneLevel,
      newBadge: specialBadge
    });

  } catch (error) {
    console.error("Watch activity error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const childId = searchParams.get("childId");

    if (!childId) {
       return NextResponse.json({ error: "Child ID is required" }, { status: 400 });
    }

    await dbConnect();
    
    if (decoded.role === "parent") {
       const child = await User.findOne({ _id: childId, parentId: decoded.userId });
       if (!child) return NextResponse.json({ error: "Unauthorized access to child data" }, { status: 403 });
    } else if (decoded.role === "child" && decoded.userId !== childId) {
       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const history = await WatchLog.find({ childId })
      .populate("videoId", "title category")
      .sort({ watchedAt: -1 });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Get watch history error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
