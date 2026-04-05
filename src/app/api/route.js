import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  // Log thông tin env (ẩn password)
  console.log("🔍 DB CONFIG:");
  console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  try {
    const [result] = await db.query("SELECT 1");

    console.log("✅ DB connected successfully!");

    return NextResponse.json({
      success: true,
      message: "DB connected",
      env: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
      },
      result,
    });
  } catch (error) {
    console.error("❌ DB connection failed!");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "DB connection failed",
        error: error.message,
        env: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
        },
      },
      { status: 500 },
    );
  }
}
