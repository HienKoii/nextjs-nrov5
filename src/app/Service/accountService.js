import db from "@/lib/db";
import { createHistory } from "./historyService";

export async function getUserById(userId) {
  const [user] = await db.query("SELECT * FROM account WHERE id = ?", [userId]);
  if (!user || user.length === 0) return null;

  const [pl] = await db.query("SELECT * FROM player WHERE account_id = ?", [user[0].id]);

  return {
    ...user[0],
    password: "đã che ^^",
    name: pl[0]?.name || null,
    gender: pl[0]?.gender || null,
  };
}

export async function updateAccountMoney(accountId, value, isActive, isTopUp) {
  try {
    const totalMoney = value * (parseFloat(process.env.PROMO_RATE) || 1);

    // Xây dựng câu lệnh SQL động dựa trên isActive và isTopUp
    const updateFields = [`vnd = vnd + ?`];

    if (isTopUp) {
      updateFields.push(`tongnap = tongnap + ?`, `naptuan = naptuan + ?`);
    }

    if (isActive) {
      updateFields.push(`active = 1`);
    }

    const updateAccountQuery = `
      UPDATE account 
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `;

    // Chuẩn bị giá trị tham số cho câu lệnh SQL
    const queryValues = [totalMoney];

    if (isTopUp) {
      queryValues.push(totalMoney, totalMoney);
    }

    queryValues.push(accountId);

    await db.query(updateAccountQuery, queryValues);

    console.log(`Tài khoản ${accountId} vừa nạp ${totalMoney} VNĐ thành công!`);

    // Lấy thông tin tài khoản sau khi cập nhật
    const [updatedUser] = await db.query("SELECT * FROM account WHERE id = ?", [accountId]);

    if (updatedUser.length > 0) {
      const user = updatedUser[0];

      // Ghi lại lịch sử giao dịch
      await createHistory(user.username, totalMoney, `${user.username} vừa được cộng tiền trên web thành công!`);

      return user;
    }

    return null;
  } catch (error) {
    console.error(`Lỗi khi cập nhật số dư tài khoản ${accountId}:`, error);
    throw error;
  }
}
