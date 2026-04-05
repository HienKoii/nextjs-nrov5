import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1");

    console.log("DB result:", rows);

    return NextResponse.json({
      success: true,
      message: "Database connected",
      result: rows,
    });
  } catch (error) {
    console.error("DB error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
