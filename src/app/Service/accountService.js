import db from "@/lib/db";

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

// Hàm cập nhật số dư tài khoản và trả về thông tin sau khi cập nhật
export async function updateAccountBalance(accountId, value) {
  try {
    const totalMoney = value * (parseFloat(process.env.PROMO_RATE) || 1);
    const updateAccountQuery = `
      UPDATE account 
      SET vnd = vnd + ?, tongnap = tongnap + ?, naptuan = naptuan + ? 
      WHERE id = ?
    `;
    await db.query(updateAccountQuery, [totalMoney, totalMoney, totalMoney, accountId]);

    console.log(`Tài khoản ${accountId} vừa nạp ${totalMoney} VNĐ thành công!`);

    // Lấy thông tin tài khoản sau khi cập nhật
    const [updatedUser] = await db.query("SELECT * FROM account WHERE id = ?", [accountId]);

    return updatedUser.length > 0 ? updatedUser[0] : null;
  } catch (error) {
    console.error(`Lỗi khi cập nhật số dư tài khoản ${accountId}:`, error);
    throw error;
  }
}
