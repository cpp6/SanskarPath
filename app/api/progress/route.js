import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Content from "@/models/Content";
import WatchLog from "@/models/WatchLog";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get("childId");

    // 1. Admin Stats
    if (decoded.role === "admin") {
      const totalParents = await User.countDocuments({ role: "parent" });
      const totalChildren = await User.countDocuments({ role: "child" });
      const totalVideos = await Content.countDocuments();
      const totalWatchEvents = await WatchLog.countDocuments();

      return NextResponse.json({
        stats: {
          totalParents,
          totalChildren,
          totalVideos,
          totalWatchEvents
        }
      });
    }

    // 2. Individual Child Progress (for Parent viewing a child or Child viewing themselves)
    const targetId = childId || (decoded.role === "child" ? decoded.userId : null);

    if (targetId) {
      // Security check: if parent, must be their child
      if (decoded.role === "parent") {
        const isMychild = await User.findOne({ _id: targetId, parentId: decoded.userId });
        if (!isMychild) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const child = await User.findById(targetId);
      if (!child) return NextResponse.json({ error: "Child not found" }, { status: 404 });

      // Calculate Screen Time (summarize today's watch durations from WatchLog if we had duration, 
      // but spec says display screen time spent. We'll use count of logs * 5 mins as estimate 
      // unless we add duration to log. Let's assume 5 mins per video for now)
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const todayLogs = await WatchLog.find({
        childId: targetId,
        watchedAt: { $gte: startOfDay }
      });
      
      const estimatedScreenTimeToday = todayLogs.length * 5; // placeholder calculation

      const recentActivity = await WatchLog.find({ childId: targetId })
        .populate("videoId", "title")
        .sort({ watchedAt: -1 })
        .limit(10);

      const totalContentForAge = await Content.countDocuments({
        ageGroup: { $in: [child.ageGroup, "all"] },
        approved: true,
      });

      return NextResponse.json({
        child: {
          id: child._id,
          name: child.name,
          ageGroup: child.ageGroup,
          xp: child.xp || 0,
          level: child.level || 1,
          badges: child.badges || [],
          streak: child.streak || 0,
          completedVideosCount: child.completedVideoIds?.length || 0,
          totalAvailableVideos: totalContentForAge,
          estimatedScreenTimeToday
        },
        recentActivity
      });
    }

    // 3. Parent overview of all children
    if (decoded.role === "parent") {
      const children = await User.find({ parentId: decoded.userId, role: "child" });
      const progress = children.map(c => ({
        id: c._id,
        name: c.name,
        ageGroup: c.ageGroup,
        xp: c.xp || 0,
        badgesCount: c.badges?.length || 0,
        streak: c.streak || 0
      }));

      return NextResponse.json({ progress });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
