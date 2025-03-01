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
