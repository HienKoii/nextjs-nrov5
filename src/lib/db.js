import mysql from "mysql2/promise";

const db = mysql.createPool(process.env.DATABASE_URL);

// Hàm kiểm tra kết nối
export async function checkDBConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Kết nối database thành công!");
    connection.release();
  } catch (error) {
    console.error("❌ Kết nối database thất bại!");
    console.error(error.message);
  }
}

export default db;
