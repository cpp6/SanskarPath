import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Content from "@/models/Content";
import { authenticateRequest } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await dbConnect();
    const { approved } = await request.json();

    const content = await Content.findByIdAndUpdate(
      params.id,
      { approved: approved !== false },
      { new: true }
    );

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Approve content error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await dbConnect();
    await Content.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Content deleted" });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
