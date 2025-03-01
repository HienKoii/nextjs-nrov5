import mysql from "mysql2/promise";

const databaseUrl = new URL(process.env.DATABASE_URL);

export const db = mysql.createPool({
  host: databaseUrl.hostname,
  user: databaseUrl.username,
  password: databaseUrl.password,
  database: databaseUrl.pathname.replace("/", ""), // Bỏ dấu '/'
  port: databaseUrl.port || 3306, // Mặc định MySQL dùng cổng 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
