const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
const util = require("util");

var sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "artistas_cd",
});

sql.connect();

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
const dbquery = util.promisify(sql.query).bind(sql);

const PORT = process.env.PORT || 5001;

app.get("/api/hi", async (req, res) => {
  const results = await dbquery("SELECT * FROM Artistas;");
  res.json({ success: true, data: results });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
