import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded || decoded.role !== "parent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const children = await User.find({ 
      parentId: decoded.userId, 
      role: "child" 
    }).sort({ createdAt: -1 });

    return NextResponse.json({ children });
  } catch (error) {
    console.error("Get children error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
