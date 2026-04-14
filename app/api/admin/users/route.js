import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { authenticateRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    await dbConnect();
    const parents = await User.find({ role: "parent" }).sort({ createdAt: -1 });
    const children = await User.find({ role: "child" }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      parents: parents.map(p => ({
        id: p._id.toString(),
        name: p.name,
        email: p.email,
        phone: p.phone,
        createdAt: p.createdAt
      })),
      children: children.map(c => ({
        id: c._id.toString(),
        name: c.name,
        email: c.email,
        ageGroup: c.ageGroup,
        parentId: c.parentId?.toString(),
        createdAt: c.createdAt,
        xp: c.xp || 0
      }))
    });
  } catch (error) {
    console.error("Admin user list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const decoded = await authenticateRequest(request);
    
    // Log headers for debugging
    console.log("[ADMIN DELETE] Method Called. Auth Decoded:", decoded);

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    // Support both userId and id query params for robustness
    const userId = searchParams.get("userId") || searchParams.get("id");

    console.log("[ADMIN DELETE] Target User ID:", userId);

    if (!userId || userId === "undefined") {
      return NextResponse.json({ error: "Valid User ID is required" }, { status: 400 });
    }

    await dbConnect();
    
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      console.log("[ADMIN DELETE] User not found in database for ID:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("[ADMIN DELETE] Executing delete for:", userToDelete.name);

    if (userToDelete.role === "parent") {
      // Cascade delete all children linked to this parent
      const childResult = await User.deleteMany({ parentId: userId });
      console.log(`[ADMIN DELETE] Cascade deleted ${childResult.deletedCount} children.`);
      await User.findByIdAndDelete(userId);
    } else {
      // Single child deletion
      await User.findByIdAndDelete(userId);
    }

    return NextResponse.json({ message: "Account successfully removed." });
  } catch (error) {
    console.error("[ADMIN DELETE] Critical Internal Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
