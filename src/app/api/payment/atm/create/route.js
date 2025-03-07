import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, amount, trans_id } = await req.json();

    if (!user_id || !amount || !trans_id) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin giao dịch" }, { status: 400 });
    }

    // Kiểm tra xem giao dịch đã tồn tại chưa
    const [existingTransaction] = await db.execute("SELECT id FROM napatm WHERE trans_id = ? LIMIT 1", [trans_id]);

    if (existingTransaction.length > 0) {
      return NextResponse.json({ success: false, message: "Giao dịch đã tồn tại" }, { status: 200 });
    }

    // Nếu chưa có, thêm giao dịch mới vào bảng transactions
    await db.execute("INSERT INTO napatm (user_id, amount, trans_id, status) VALUES (?, ?, ?, 'pending')", [user_id, amount, trans_id]);

    return NextResponse.json({ success: true, message: "Giao dịch đã được lưu" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lưu giao dịch:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}
