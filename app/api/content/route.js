import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Content from "@/models/Content";
import { authenticateRequest } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ageGroup = searchParams.get("ageGroup");
    const approved = searchParams.get("approved");

    const filter = {};
    if (ageGroup) {
      filter.ageGroup = { $in: [ageGroup, "all"] };
    }
    if (approved !== null && approved !== undefined) {
      filter.approved = approved === "true";
    }

    const content = await Content.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Get content error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const decoded = await authenticateRequest(request);
    
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    await dbConnect();

    const formData = await request.formData();
    
    const title = formData.get("title");
    const description = formData.get("description");
    const ageGroup = formData.get("ageGroup");
    const videoFile = formData.get("videoFile");
    const thumbnailFile = formData.get("thumbnailFile");

    if (!title || !description || !ageGroup || !videoFile) {
      return NextResponse.json(
        { error: "Title, description, video file, and age group are required" },
        { status: 400 }
      );
    }

    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    const videoResult = await uploadToCloudinary(videoBuffer, "sanskaarpath/videos", "video");
    const videoUrl = videoResult.secure_url;

    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const thumbResult = await uploadToCloudinary(thumbBuffer, "sanskaarpath/thumbnails", "image");
      thumbnailUrl = thumbResult.secure_url;
    }

    const content = await Content.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      ageGroup,
      xpReward: 5,
      approved: true,
      createdBy: decoded.userId || null,
    });

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error("Create content error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
       return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await dbConnect();
    const video = await Content.findById(id);
    
    if (!video) {
       return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // File cleanup is now handled by Cloudinary if desired (not implemented here to avoid complexity)

    await Content.findByIdAndDelete(id);

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
