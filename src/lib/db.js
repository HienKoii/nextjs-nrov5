import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
