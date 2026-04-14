import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Child from "@/models/Child";
import { authenticateRequest } from "@/lib/auth";
import { checkNewBadges, calculateLevel } from "@/utils/gamification";

export async function GET(request, { params }) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const child = await Child.findById(params.id);

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (child.parentId.toString() !== decoded.userId && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ child });
  } catch (error) {
    console.error("Get child error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const child = await Child.findById(params.id);

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (child.parentId.toString() !== decoded.userId && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    // Handle XP addition
    if (body.addXP) {
      child.xp += body.addXP;
      child.level = calculateLevel(child.xp);

      // Check for new badges
      const newBadges = checkNewBadges(child);
      for (const badge of newBadges) {
        child.badges.push({ id: badge.id, name: badge.name, icon: badge.icon });
      }
    }

    // Handle content completion
    if (body.completeContent) {
      if (!child.completedContentIds.includes(body.completeContent)) {
        child.completedContentIds.push(body.completeContent);
      }
    }

    // Handle streak update
    if (body.updateStreak) {
      const today = new Date().toDateString();
      const lastActive = child.lastActiveDate
        ? new Date(child.lastActiveDate).toDateString()
        : null;

      if (lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastActive === yesterday) {
          child.streak += 1;
        } else if (lastActive !== today) {
          child.streak = 1;
        }
        child.lastActiveDate = new Date();
      }
    }

    // Handle progress updates
    if (body.progress) {
      child.progress = { ...child.progress.toObject?.() || child.progress, ...body.progress };
    }

    // Handle screen time limit
    if (body.screenTimeLimit !== undefined) {
      child.screenTimeLimit = body.screenTimeLimit;
    }

    // Handle lock
    if (body.isLocked !== undefined) {
      child.isLocked = body.isLocked;
    }

    // Handle focus mode
    if (body.focusModeEnabled !== undefined) {
      child.focusModeEnabled = body.focusModeEnabled;
    }

    // Handle current screen time
    if (body.currentScreenTime !== undefined) {
      child.currentScreenTime = body.currentScreenTime;
    }

    await child.save();

    return NextResponse.json({ child });
  } catch (error) {
    console.error("Update child error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
