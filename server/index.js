const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
const util = require("util");

var sql = mysql.createConnection({
  host: "mysql-walmart-noelrinaya318-6b3e.j.aivencloud.com",
  port: 21811,
  user: "avnadmin",
  password: "AVNS_xntBSi1SLgFCK0XU07B",
  database: "defaultdb",
});

sql.connect();

const app = express();


require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
const dbquery = util.promisify(sql.query).bind(sql);

const PORT = process.env.PORT || 5001;

app.get("/api/hi", async (req, res) => {
  const results = await dbquery("Select * from Productos;");
  sql.end();
  res.json({ success: true, data: results });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
