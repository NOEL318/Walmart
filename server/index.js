const express = require("express");
const cors = require("cors");
const { signIn, loginwithoutpassword, signUp } = require("./auth/auth");
const { dbquery } = require("./MySQL_config");
const path = require("path");
const crypto = require("crypto");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

app.post("/api/buscarclienteusuarios", async (req, res) => {
  var { email } = req.body;
  const data = await dbquery(`
		SELECT 
      u.email,
			c.id_cliente
		FROM 
    	Usuarios u
		JOIN 
    	Clientes c ON u.id_usuario = c.id_usuario
		WHERE 
    	u.email LIKE '%${email}%' LIMIT 5;
;
`);
  res.json({ success: true, data: data });
});

app.post("/api/create_empleado_from_cliente", async (req, res) => {
  var { email, rol, puesto, id_tienda, salario } = req.body;
  const data =
    await dbquery(`CALL ConvertirClienteAEmpleado('${email}','${rol}',
    '${puesto}',
    '${id_tienda}',
    ${parseFloat(salario)});`);
  res.json({ success: true, data: data });
});

app.post("/api/create_proveedor_from_cliente", async (req, res) => {
  var { email } = req.body;
  const data = await dbquery(`CALL ConvertirClienteAProveedor('${email}');`);
  res.json({ success: true, data: data });
});

app.get("/api/obtener_proveedores", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Proveedores;`);
  res.json({ success: true, data: data });
});

app.post("/api/obtener_producto_info", async (req, res) => {
  var { id_producto } = req.body;

  const data = await dbquery(
    `SELECT * FROM Productos WHERE id_producto = '${id_producto}';`
  );
  res.json({ success: true, data: data });
});

app.post("/api/obtener_producto_inventario", async (req, res) => {
  var { id_producto } = req.body;
  const data = await dbquery(
    `SELECT 
  t.nombre AS nombre_tienda,
  i.cantidad
FROM Inventario i
JOIN Tiendas t ON i.id_tienda = t.id_tienda
WHERE i.id_producto = '${id_producto}';`
  );
  res.json({ success: true, data: data });
});

app.get("/api/obtener_categorias", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Categorias;`);
  res.json({ success: true, data: data });
});

app.get("/api/obtener_usuarios", async (req, res) => {
  const data = await dbquery(`SELECT 
  id_usuario,
  email,
  rol,
  fecha_creacion,
  activo
FROM Usuarios;`);
  res.json({ success: true, data: data });
});

app.post("/api/crear_categoria", async (req, res) => {
  var { nombre, descripcion } = req.body;
  const results = await dbquery(
    `INSERT INTO Categorias (nombre, descripcion) VALUES ('${nombre}', '${descripcion}');`
  );
  res.json({ success: true, data: results });
});

app.post("/api/crear_pedido_proveedor", async (req, res) => {
  var { id_proveedor, estatus, total_pedido, productos } = req.body;
  const id_pedido = crypto.randomUUID();
  const results = await dbquery(
    `INSERT INTO Pedidos_Proveedores (id_pedido, id_proveedor, fecha_pedido, estatus, total_pedido)
VALUES ('${id_pedido}',
  '${id_proveedor}',
  NOW(),
  '${estatus}',
  ${total_pedido}
);`
  );
  if (results) {
    await productos.map(async (producto) => {
      const results2 = await dbquery(
        `
			INSERT INTO Detalles_Pedido (id_pedido, id_producto, cantidad, precio_unitario)
			VALUES ('${id_pedido}', '${producto.id_producto}', ${producto.cantidad}, ${producto.precio_unitario})
      `
      );
      console.log(results2);
    });
  }
  res.json({ success: true, data: results });
});

app.post("/api/tramitar_membresia", async (req, res) => {
  var { id_cliente, puntos, numero_tarjeta, expiracion } = req.body;
  const results = await dbquery(
    `INSERT INTO Membresia_Walmart (id_cliente, puntos, numero_tarjeta, expiracion) VALUES ('${id_cliente}', ${puntos}, '${numero_tarjeta}', '${expiracion}');`
  );
  res.json({ success: true, data: results });
});
app.post("/api/obtener_membresia", async (req, res) => {
  const { id_cliente } = req.body;
  const data = await dbquery(`SELECT *
FROM Membresia_Walmart WHERE id_cliente= '${id_cliente}';`);
  res.json({ success: true, data: data });
});

app.get("/api/obtener_pedidos", async (req, res) => {
  const data = await dbquery(`
      SELECT 
        Pedidos_Proveedores.id_pedido, 
        Pedidos_Proveedores.fecha_pedido, 
        Pedidos_Proveedores.estatus, 
        Pedidos_Proveedores.total_pedido, 
        Proveedores.nombre AS proveedor_nombre,
        Proveedores.direccion AS proveedor_direccion,
        Proveedores.telefono AS proveedor_telefono
      FROM Pedidos_Proveedores
      JOIN Proveedores ON Pedidos_Proveedores.id_proveedor = Proveedores.id_proveedor;
    `);
  res.json({ success: true, data: data });
});

app.post("/api/crear_producto", async (req, res) => {
  var {
    nombre,
    descripcion,
    precio_unitario,
    id_categoria,
    min_stock,
    img_url,
    id_proveedor,
  } = req.body;
  const results = await dbquery(
    `INSERT INTO Productos (nombre, descripcion, precio_unitario, id_categoria, min_stock, img_url, id_proveedor) VALUES ('${nombre}', '${descripcion}', '${parseFloat(
      precio_unitario
    )}', '${id_categoria}', '${parseInt(
      min_stock
    )}', '${img_url}', '${id_proveedor}');`
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
app.get("/api/obtener_proveedores", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Proveedores;`);
  res.json({ success: true, data });
});

app.post("/api/obtener_productos_proveedor", async (req, res) => {
  var { id_proveedor } = req.body;
  const data = await dbquery(`SELECT * 
FROM Productos
WHERE id_proveedor = '${id_proveedor}';
`);
  res.json({ success: true, data });
});

app.get("/api/obtener_almacenes", async (req, res) => {
  const data = await dbquery(`SELECT * FROM Almacenes;`);
  res.json({ success: true, data });
});

app.post("/api/add_to_almacen_inventario", async (req, res) => {
  var { id_producto, id_almacen, cantidad, id_tienda } = req.body;
  console.log(req.body, "Asjjsaj");
  const data = await dbquery(`
      INSERT INTO Inventario (id_producto, id_almacen, id_tienda, cantidad)
      VALUES ('${id_producto}', '${id_almacen}', '${id_tienda}',${parseInt(
    cantidad
  )})
      ON DUPLICATE KEY UPDATE 
        cantidad = cantidad + VALUES(cantidad),
        updated = CURRENT_TIMESTAMP;
    `);

  const sqlAlmacen = await dbquery(`
      UPDATE Almacenes
      SET no_productos = no_productos + ${parseInt(cantidad)}
      WHERE id_almacen = '${id_almacen}';
    `);

  res.json({ data });
});

app.post("/api/get_almacen", async (req, res) => {
  var { id_almacen } = req.body;
  const data = await dbquery(
    `SELECT * FROM Almacenes WHERE id_almacen = '${id_almacen}';`
  );

  res.json({ data });
});

app.post("/api/obtener_pedidos_proveedor", async (req, res) => {
  var { id_proveedor } = req.body;
  const data = await dbquery(
    `SELECT * FROM Pedidos_Proveedores WHERE id_proveedor = '${id_proveedor}';`
  );

  res.json({ data });
});

app.post("/api/obtener_detalles_pedido", async (req, res) => {
  var { id_pedido } = req.body;
  const data = await dbquery(
    `
      SELECT 
        pp.id_pedido,
        pp.fecha_pedido,
        pp.estatus,
        pp.total_pedido,

        p.id_proveedor,
        p.nombre AS proveedor_nombre,
        p.direccion AS proveedor_direccion,
        p.telefono AS proveedor_telefono,

        dp.id_detalle_pedido,
        dp.id_producto,
        pr.nombre AS producto_nombre,
        dp.cantidad,
        dp.precio_unitario

      FROM Pedidos_Proveedores pp
      JOIN Proveedores p ON pp.id_proveedor = p.id_proveedor
      LEFT JOIN Detalles_Pedido dp ON pp.id_pedido = dp.id_pedido
      LEFT JOIN Productos pr ON dp.id_producto = pr.id_producto
      WHERE pp.id_pedido = '${id_pedido}'
    `
  );

  res.json({ data });
});

app.post("/api/actualizar_pedido", async (req, res) => {
  var { id_pedido, estatus } = req.body;
  const data = await dbquery(
    `UPDATE Pedidos_Proveedores
SET estatus = '${estatus}'
WHERE id_pedido = '${id_pedido}';`
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
		i.id_tienda,

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

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
