import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { amount, identifier, isUsername } = await req.json();

  const numericAmount = Number(amount); // Chuyển đổi amount thành number
  console.log("isUsername", isUsername);
  console.log("identifier", identifier);
  console.log("amount", numericAmount);

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "Không có token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token,  process.env.JWT_SECRET);

  try {
    const { id, is_admin } = decoded;
    console.log("is_admin", is_admin);
    if (!is_admin) {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const conditionField = isUsername ? "username" : "id";
    const [user] = await db.query(`SELECT * FROM account WHERE ${conditionField} = ?`, [identifier]);

    if (user.length === 0) {
      return NextResponse.json({ message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    const totalMoney = numericAmount * (parseFloat(process.env.PROMO_RATE) || 1);
    const updateAccountQuery = `
    UPDATE account 
    SET vnd = vnd + ?, tongnap = tongnap + ?, naptuan = naptuan + ? 
    WHERE id = ?
  `;
    await db.query(updateAccountQuery, [totalMoney, totalMoney, totalMoney, user[0].id]);

    // Lưu lịch sử giao dịch vào bảng history_gold
    const sqlTaoLichSuMua = "INSERT INTO history_gold (name, gold, lydo) VALUES (?, ?, ?)";
    const valuesTaoLichSuMua = [user[0].username, totalMoney, `${user[0].username} vừa được cộng tiền trên web thành công!`];
    await db.query(sqlTaoLichSuMua, valuesTaoLichSuMua);

    return NextResponse.json({ message: `Đã cộng ${numericAmount} VND vào tài khoản của ${identifier}` }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cộng tiền:", error);
    return NextResponse.json({ message: "Lỗi server. Vui lòng thử lại sau." }, { status: 500 });
  }
}
