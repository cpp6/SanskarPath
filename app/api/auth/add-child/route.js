import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword, authenticateRequest } from "@/lib/auth";

export async function POST(request) {
  try {
    const decoded = await authenticateRequest(request);
    if (!decoded || decoded.role !== "parent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { name, email, password, ageGroup } = await request.json();

    if (!name || !email || !password || !ageGroup) {
      return NextResponse.json(
        { error: "Name, email, password, and age group are required" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const validAgeGroups = ["4-6", "7-9", "10-12", "13+"];
    if (!validAgeGroups.includes(ageGroup)) {
      return NextResponse.json(
        { error: "Invalid age group" },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);
    const childUser = await User.create({
      name,
      email: lowerEmail,
      password: hashedPassword,
      role: "child",
      parentId: decoded.userId,
      ageGroup,
      badges: [{ id: "first_login", name: "First Steps", icon: "👣" }],
    });

    return NextResponse.json(
      {
        message: "Child profile created successfully",
        child: {
          id: childUser._id,
          name: childUser.name,
          email: childUser.email,
          ageGroup: childUser.ageGroup,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add child error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
