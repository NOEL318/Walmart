const express = require("express");
const cors = require("cors");
const { signIn, loginwithoutpassword } = require("./auth/auth");
const { dbquery } = require("./MySQL_config");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 5001;

app.get("/api/hi", async (req, res) => {
  const results = await dbquery("Select * from Productos;");
  res.json({ success: true, data: results });
});

app.post("/api/signin", async (req, res) => {
  res.json(await signIn(req.body));
});
app.post("/api/loginwithoutpassword", async (req, res) => {
  res.json(await loginwithoutpassword(req.body));
});

app.post("/api/nuevo_proveedor", async (req, res) => {
  var { nombre, direccion, telefono, email } = req.body;
  const results = await dbquery(
    `INSERT INTO Proveedores (nombre, direccion, telefono, email) VALUES ('${nombre}', '${direccion}', '${telefono}', '${email}');`
  );
  res.json({ success: true, data: results });
});

app.get("/api/obtener_proveedores", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Proveedores;`);
  res.json({ success: true, data: data });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
