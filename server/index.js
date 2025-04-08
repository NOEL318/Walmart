const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
const util = require("util");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 5001;

var sql = mysql.createConnection({
  host: process.env.HOSTNAME_BD,
  port: 21811,
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_DB,
});

sql.connect();
const dbquery = util.promisify(sql.query).bind(sql);

app.get("/api/hi", async (req, res) => {
  const results = await dbquery("Select * from Productos;");
  sql.end();
  res.json({ success: true, data: results });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
