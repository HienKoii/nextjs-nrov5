import { updateAccountBalance } from "@/app/Service/accountService";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { trans_id, amount, user_id } = await req.json();

    // Kiểm tra giao dịch hợp lệ
    const [transactions] = await db.execute("SELECT * FROM napatm WHERE trans_id = ? AND status = 'pending'", [trans_id]);

    if (transactions.length === 0) {
      return NextResponse.json({ success: false, message: "Giao dịch không hợp lệ hoặc đã xử lý" }, { status: 400 });
    }

    // Cập nhật trạng thái giao dịch
    await db.execute("UPDATE napatm SET status = 'success' WHERE trans_id = ?", [trans_id]);

    // Cập nhật số dư tài khoản bằng hàm updateAccountBalance
    await updateAccountBalance(user_id, amount);

    console.log(`Tài khoản ${user_id} vừa nạp ${amount} VNĐ thành công!`);

    return NextResponse.json({ success: true, message: "Nạp tiền thành công!" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật giao dịch:", error);
    return NextResponse.json({ success: false, message: "Lỗi hệ thống" }, { status: 500 });
  }
}
