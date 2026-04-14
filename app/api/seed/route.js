import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Content from "@/models/Content";
import WatchLog from "@/models/WatchLog";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    await dbConnect();

    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});
    await WatchLog.deleteMany({});

    // 1. Create Admin (for DB lookup if email is different from gmail)
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword("admin123"),
      role: "admin",
    });

    // 2. Create Demo Parent
    const parent = await User.create({
      name: "Rajesh Kumar",
      email: "parent@demo.com",
      password: hashPassword("demo123"),
      phone: "9876543210",
      role: "parent",
    });

    // 3. Create Demo Children (as User objects)
    const child1 = await User.create({
      name: "Aarav",
      email: "aarav@demo.com",
      password: hashPassword("aarav123"),
      role: "child",
      parentId: parent._id,
      ageGroup: "7-9",
      xp: 155,
      level: 1,
      streak: 5,
      badges: [
        { id: "first_login", name: "First Steps", icon: "👣" },
        { id: "milestone_100", name: "Badge of Honor (100 Points)", icon: "🎖️" }
      ],
    });

    const child2 = await User.create({
      name: "Meera",
      email: "meera@demo.com",
      password: hashPassword("meera123"),
      role: "child",
      parentId: parent._id,
      ageGroup: "10-12",
      xp: 85,
      level: 1,
      streak: 12,
      badges: [
        { id: "first_login", name: "First Steps", icon: "👣" }
      ],
    });

    // 4. Seed Video Content
    const videoItems = [
      {
        title: "The Story of Patience",
        description: "Learn why waiting and perseverance lead to great results.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        ageGroup: "7-9",
        xpReward: 5
      },
      {
        title: "Kindness to Animals",
        description: "A beautiful lesson on why we should respect all living beings.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        ageGroup: "4-6",
        xpReward: 5
      },
      {
        title: "The Bhagavad Gita for Kids",
        description: "Simple life lessons on duty and focus.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        ageGroup: "10-12",
        xpReward: 5
      },
      {
        title: "Ancient Wisdom on Leadership",
        description: "Lessons from Chanakya Neeti translated for the modern world.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        ageGroup: "13+",
        xpReward: 5
      },
      {
        title: "Mindfulness and Meditation",
        description: "A short guide to inner peace and concentration.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        ageGroup: "all",
        xpReward: 5
      }
    ];

    const createdVideos = await Content.insertMany(
       videoItems.map(v => ({ ...v, createdBy: admin._id }))
    );

    // 5. Seed Watch Logs (for history and stats)
    const logs = [
      { childId: child1._id, videoId: createdVideos[0]._id, pointsAwarded: 5, watchedAt: new Date(Date.now() - 86400000) },
      { childId: child1._id, videoId: createdVideos[4]._id, pointsAwarded: 5, watchedAt: new Date() },
      { childId: child2._id, videoId: createdVideos[2]._id, pointsAwarded: 5, watchedAt: new Date() }
    ];

    await WatchLog.insertMany(logs);

    return NextResponse.json({
      message: "Database seeded successfully for Sanskar Digital!",
      data: {
        admin: { email: "admin@gmail.com", password: "admin123" },
        parent: { email: "parent@demo.com", password: "demo123" },
        children: ["aarav@demo.com", "meera@demo.com"],
        videoCount: createdVideos.length
      }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
