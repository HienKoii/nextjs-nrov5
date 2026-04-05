import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  // Lấy thông tin env
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD ? "******" : "NOT SET",
  };

  console.log("🔍 DB CONFIG:", dbConfig);

  try {
    const [rows] = await db.query("SELECT 1");

    console.log("✅ DB connected!");
    console.log("Result:", rows);

    return NextResponse.json({
      success: true,
      message: "Database connected",
      connection: dbConfig,
      result: rows,
    });
  } catch (error) {
    console.error("❌ DB error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        connection: dbConfig,
        error: error.message,
      },
      { status: 500 }
    );
  }
}