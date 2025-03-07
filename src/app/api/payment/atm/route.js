import { NextResponse } from "next/server";
import db from "@/lib/db"; // Kết nối database MySQL
import axios from "axios";
import { updateAccountBalance } from "@/app/Service/accountService";

export async function POST(req) {
  try {
    const response = await axios.get(`https://api.sieuthicode.net/historyapivcbv2/${process.env.TOKEN_ATM}`);

    const transactions = response.data.transactions;

    let count = 0;

    for (const transaction of transactions) {
      const { transactionID, amount, description, type, transactionDate } = transaction;

      if (type === "IN") {
        // Dùng regex để tìm ID user trong description (ví dụ: "naptien 611")
        const match = description.match(/naptien (\d+)/);

        if (match) {
          const userId = parseInt(match[1], 10);

          // Kiểm tra user có tồn tại không
          const user = await db.query("SELECT id FROM account WHERE id = ?", [userId]);

          if (user.length > 0) {
            // Kiểm tra xem giao dịch đã được xử lý chưa
            const checkExist = await db.query("SELECT * FROM deposits WHERE transaction_id = ?", [transactionID]);

            if (checkExist[0].length === 0) {
              // Cộng tiền vào tài khoản người dùng
              await updateAccountBalance(userId, amount);

              // Lưu lịch sử giao dịch vào database
              await db.query("INSERT INTO deposits (transaction_id, user_id, amount, transaction_date) VALUES (?, ?, ?, ?)", [transactionID, userId, amount, transactionDate]);

              count++;
            } else {
              console.log("⚠️ Giao dịch đã được xử lý trước đó, bỏ qua.");
            }
          } else {
            console.log("🚫 User không tồn tại, bỏ qua giao dịch.");
          }
        } else {
          console.log("🚫 Không tìm thấy ID user trong mô tả giao dịch.");
        }
      } else {
        console.log("🔄 Giao dịch không phải là nạp tiền, bỏ qua.");
      }
    }

    console.log(`✅ Hoàn thành xử lý. Đã cộng tiền cho ${count} giao dịch hợp lệ.`);
    return NextResponse.json({ message: `Đã cộng tiền cho ${count} giao dịch hợp lệ` }, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
