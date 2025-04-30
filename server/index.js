const express = require("express");
const cors = require("cors");
const { signIn, loginwithoutpassword, signUp } = require("./auth/auth");
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

app.post("/api/signup", async (req, res) => {
  res.json(await signUp(req.body));
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

app.get("/api/obtener_categorias", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Categorias;`);
  res.json({ success: true, data: data });
});

app.post("/api/crear_categoria", async (req, res) => {
  var { nombre, descripcion } = req.body;
  const results = await dbquery(
    `INSERT INTO Categorias (nombre, descripcion) VALUES ('${nombre}', '${descripcion}');`
  );
  res.json({ success: true, data: results });
});

app.post("/api/crear_producto", async (req, res) => {
  var {
    nombre,
    descripcion,
    precio_unitario,
    id_categoria,
    min_stock,
    img_url,
  } = req.body;
  const results = await dbquery(
    `INSERT INTO Productos (nombre, descripcion, precio_unitario, id_categoria, min_stock, img_url) VALUES ('${nombre}', '${descripcion}', '${parseFloat(
      precio_unitario
    )}', '${id_categoria}', '${parseInt(min_stock)}', '${img_url}');`
  );
  res.json({ success: true, data: results });
});

app.post("/api/crear_almacen", async (req, res) => {
  var { nombre, direccion, no_productos, capacidad } = req.body;
  const results = await dbquery(
    `INSERT INTO Almacenes (nombre, direccion, no_productos, capacidad) VALUES ('${nombre}', '${direccion}', '${parseInt(
      no_productos
    )}', '${parseInt(capacidad)}');`
  );
  res.json({ success: true, data: results });
});
app.post("/api/crear_tienda", async (req, res) => {
  var { nombre, direccion, telefono, ciudad } = req.body;
  console.log(req.body, "assjjsaja");
  const results = await dbquery(
    `INSERT INTO Tiendas (nombre, direccion, telefono, ciudad) VALUES ('${nombre}', '${direccion}', '${telefono}', '${ciudad}');`
  );
  res.json({ success: true, data: results });
});

app.get("/api/obtener_productos", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Productos;`);
  res.json({ success: true, data });
});

app.get("/api/obtener_almacenes", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Almacenes;`);
  res.json({ success: true, data });
});

app.post("/api/add_to_almacen_inventario", async (req, res) => {
  var { id_producto, id_almacen, cantidad } = req.body;
  const data = await dbquery(
    `Insert Into Inventario(id_producto, id_almacen, cantidad) VALUES ('${id_producto}', '${id_almacen}', ${parseInt(
      cantidad
    )})`
  );
  res.json({ data });
});

app.post("/api/get_almacen", async (req, res) => {
  var { id_almacen } = req.body;
  const data = await dbquery(
    `SELECT * FROM Almacenes WHERE id_almacen = '${id_almacen}';`
  );

  res.json({ data });
});

app.post("/api/get_inventario", async (req, res) => {
  var { id_almacen } = req.body;

  const almacenData = await dbquery(
    `
  SELECT 
    id_almacen,
    nombre,
    direccion,
    no_productos,
    capacidad
  FROM Almacenes
  WHERE id_almacen = '${id_almacen}';
  `
  );
  const inventarioData = await dbquery(
    `
  SELECT 
    i.id_inventario,
    i.id_producto,
    i.cantidad,
    i.updated,

    p.nombre AS nombre,
    p.descripcion,
    p.precio_unitario,
    p.min_stock,
    p.fecha_registro
  FROM Inventario i
  JOIN Productos p ON i.id_producto = p.id_producto
  WHERE i.id_almacen = '${id_almacen}';
  `
  );
  const data = {
    almacen: almacenData[0] || {},
    inventario: inventarioData,
  };
  res.json({ success: true, data });
});

app.get("/api/obtener_tiendas", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Tiendas;`);
  res.json({ success: true, data });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
