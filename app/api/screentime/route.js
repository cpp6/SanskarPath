import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Child from "@/models/Child";
import ActivityLog from "@/models/ActivityLog";
import { authenticateRequest } from "@/lib/auth";

export async function POST(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { childId, usageTime } = await request.json();

    if (!childId || usageTime === undefined) {
      return NextResponse.json(
        { error: "childId and usageTime are required" },
        { status: 400 }
      );
    }

    const child = await Child.findById(childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    child.currentScreenTime = (child.currentScreenTime || 0) + usageTime;
    const isExceeded = child.currentScreenTime >= child.screenTimeLimit;

    if (isExceeded) {
      child.isLocked = true;
    }

    await child.save();

    // Log activity
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let log = await ActivityLog.findOne({
      childId,
      date: { $gte: today },
    });

    if (log) {
      log.usageTime += usageTime;
      await log.save();
    } else {
      log = await ActivityLog.create({
        childId,
        usageTime,
        date: new Date(),
      });
    }

    return NextResponse.json({
      currentScreenTime: child.currentScreenTime,
      screenTimeLimit: child.screenTimeLimit,
      isLocked: child.isLocked,
      isExceeded,
    });
  } catch (error) {
    console.error("Screen time error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get("childId");
    const days = parseInt(searchParams.get("days") || "7");

    if (!childId) {
      return NextResponse.json({ error: "childId is required" }, { status: 400 });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const logs = await ActivityLog.find({
      childId,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    const child = await Child.findById(childId).select("screenTimeLimit currentScreenTime isLocked");

    return NextResponse.json({ logs, child });
  } catch (error) {
    console.error("Get screen time error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
