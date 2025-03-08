import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { updateAccountMoney } from "@/app/Service/accountService";

export async function POST(req) {
  const { amount, identifier, isUsername } = await req.json();

  const numericAmount = Number(amount); // Chuyển đổi amount thành number
  console.log("isUsername", isUsername);
  console.log("identifier", identifier);
  console.log("amount", numericAmount);

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "Không có token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const { is_admin } = decoded;
    if (!is_admin) {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const conditionField = isUsername ? "username" : "id";
    const [user] = await db.query(`SELECT * FROM account WHERE ${conditionField} = ?`, [identifier]);

    if (user.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    // Cộng tiền vào tài khoản người dùng
    await updateAccountMoney(user[0].id, numericAmount, false, false);

    return NextResponse.json({ message: `Đã cộng ${numericAmount} VND vào tài khoản của ${identifier}` }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cộng tiền:", error);
    return NextResponse.json({ message: "Lỗi server. Vui lòng thử lại sau." }, { status: 500 });
  }
}
