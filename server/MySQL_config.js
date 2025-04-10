const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const sql = mysql.createConnection({
  host: process.env.HOSTNAME_BD,
  port: 21811,
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_DB,
});

sql.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

const dbquery = util.promisify(sql.query).bind(sql);

module.exports = {
  dbquery
};
