const { createPool } = require("mysql2/promise");

//환경 설정
// const dotenv = require("dotenv");
// dotenv.config();

// const dbInfo = {
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// };

const dbInfo = {
  host: "localhost",
  user: "root",
  password: "123123",
  database: "onlineclass",
  connectTimeout: 5000,
  connectionLimit: 30, //default 10
};

const pool = createPool(dbInfo);

module.exports = pool;
