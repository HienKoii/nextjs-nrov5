import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function checkConnection() {
  try {
    // Kiểm tra kết nối với database
    const connection = await db.getConnection();
    console.log("Kết nối tới MySQL thành công!");
    connection.release(); // Giải phóng kết nối sau khi sử dụng
  } catch (error) {
    console.error("Lỗi khi kết nối tới MySQL:", error.message);
    console.error("Chi tiết lỗi:", error);
  }
}

// Gọi hàm kiểm tra kết nối khi khởi động ứng dụng
checkConnection();
