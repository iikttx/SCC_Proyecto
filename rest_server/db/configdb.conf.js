import dotenv from "dotenv";
import mysql from "mysql2/promise";
import mysqlBasic from "mysql";
dotenv.config();

// 🔁 Pool de conexiones con mysql2/promise
export const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// 🔗 Conexión básica con mysql (callbacks)
export const connection = mysqlBasic.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
