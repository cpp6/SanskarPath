import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase();

    // 1. Hardcoded Admin Login
    if (lowerEmail === "admin@gmail.com" && password === "admin123") {
      const token = signToken({ role: "admin", email: lowerEmail });
      return NextResponse.json({
        token,
        user: {
          name: "Administrator",
          email: lowerEmail,
          role: "admin",
        },
      });
    }

    // 2. Database Lookup for Parent/Child
    const user = await User.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user._id, role: user.role });

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ageGroup: user.ageGroup,
        parentId: user.parentId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
