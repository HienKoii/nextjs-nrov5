/*
CREATE TABLE napatm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES account(id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_user_id (user_id)
);
*/

import { NextResponse } from "next/server";
import db from "@/lib/db"; // Kết nối database MySQL
import axios from "axios";
import { updateAccountMoney } from "@/Services/accountService";

export async function POST(req) {
  try {
    const token = process.env.TOKEN_ATM;
    const siteId = process.env.NEXT_PUBLIC_SITE_ID;
    console.log("[AutoDeposit] Bắt đầu xử lý POST /api/payment/atm");
    console.log("[AutoDeposit] TOKEN_ATM:", token);
    console.log("[AutoDeposit] NEXT_PUBLIC_SITE_ID:", siteId);
    if (!token || !siteId) {
      console.error("[AutoDeposit] Thiếu biến môi trường");
      return NextResponse.json({ message: "Thiếu biến môi trường TOKEN_ATM hoặc NEXT_PUBLIC_SITE_ID" }, { status: 500 });
    }

    // Gọi API lấy lịch sử giao dịch
    let response;
    try {
      console.log("[AutoDeposit] Gọi API lấy lịch sử giao dịch...");
      response = await axios.get(`https://api.sieuthicode.net/historyapivcbv2/${token}`);
      console.log("[AutoDeposit] API trả về:", response.data);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Không xác định";
      console.error("[AutoDeposit] Lỗi gọi API:", msg);
      return NextResponse.json({ message: `Lỗi gọi API: ${msg}`, status: err?.response?.status || 500 }, { status: 500 });
    }

    const transactions = response.data?.transactions;
    console.log(`[AutoDeposit] Số lượng giao dịch lấy về: ${Array.isArray(transactions) ? transactions.length : 0}`);
    if (!Array.isArray(transactions)) {
      console.error("[AutoDeposit] API không trả về mảng giao dịch", transactions);
      return NextResponse.json({ message: "API không trả về mảng giao dịch" }, { status: 500 });
    }

    // Lọc các giao dịch hợp lệ
    const validTransactions = transactions.filter((tran) => {
      if (tran.type !== "IN") return false;
      const regex = new RegExp(`${siteId} (\\d+)`, "i");
      const isValid = regex.test(tran.description || "");
      if (!isValid) {
        console.log(`[AutoDeposit] Bỏ qua giao dịch không hợp lệ:`, tran);
      }
      return isValid;
    });
    console.log(`[AutoDeposit] Số giao dịch hợp lệ: ${validTransactions.length}`);

    // Xử lý song song các giao dịch hợp lệ
    let count = 0;
    const results = await Promise.all(
      validTransactions.map(async (tran, idx) => {
        console.log(`[AutoDeposit][${idx}] Bắt đầu xử lý giao dịch:`, tran);
        const regex = new RegExp(`${siteId} (\\d+)`, "i");
        const match = (tran.description || "").match(regex);
        if (!match) {
          console.log(`[AutoDeposit][${idx}] Không tìm thấy userId trong mô tả giao dịch.`);
          return null;
        }
        const userId = parseInt(match[1], 10);
        console.log(`[AutoDeposit][${idx}] userId tìm được:`, userId);
        // Kiểm tra user
        const user = await db.query("SELECT id FROM account WHERE id = ?", [userId]);
        if (!user.length) {
          console.log(`[AutoDeposit][${idx}] UserId không tồn tại trong DB, bỏ qua.`);
          return null;
        }
        // Kiểm tra giao dịch đã xử lý chưa
        const checkExist = await db.query("SELECT * FROM napatm WHERE transaction_id = ?", [tran.transactionID]);
        if (checkExist[0].length > 0) {
          console.log(`[AutoDeposit][${idx}] Giao dịch đã tồn tại, bỏ qua.`);
          return null;
        }
        // Cộng tiền và lưu lịch sử
        try {
          await updateAccountMoney(userId, tran.amount, false, true);
          await db.query("INSERT INTO napatm (transaction_id, user_id, amount, transaction_date) VALUES (?, ?, ?, ?)", [tran.transactionID, userId, tran.amount, tran.transactionDate]);
          count++;
          console.log(`[AutoDeposit][${idx}] Đã cộng tiền và lưu lịch sử cho userId:`, userId);
        } catch (err) {
          console.error(`[AutoDeposit][${idx}] Lỗi khi cộng tiền/lưu lịch sử:`, err);
          return null;
        }
        return userId;
      })
    );

    console.log(`[AutoDeposit] Hoàn thành xử lý. Đã cộng tiền cho ${count} giao dịch hợp lệ.`);
    return NextResponse.json({ message: `Đã cộng tiền cho ${count} giao dịch hợp lệ`, users: results.filter(Boolean) }, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi xử lý auto deposit:", error);
    return NextResponse.json({ message: error?.message || "Lỗi xử lý auto deposit" }, { status: 500 });
  }
}
