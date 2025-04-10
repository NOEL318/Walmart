-- create database defaultdb;
drop database defaultdb;
create database defaultdb;
use defaultdb;


CREATE TABLE Categorias(
id_categoria VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
descripcion varchar(255)
);

CREATE TABLE Almacenes(
id_almacen VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
no_productos int, -- numero de productos que tiene
capacidad int -- porcentaje de capacidad
);

CREATE TABLE Usuarios (
    id_usuario VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT(UUID()),
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'empleado', 'proveedor', 'admin') NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Proveedores(
id_proveedor VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
telefono varchar(15),
email varchar(100),
id_usuario VARCHAR(36),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


create table Productos(
id_producto VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
descripcion varchar(255),
precio_unitario double,
id_categoria varchar(36),
FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria),
min_stock int, -- stock minimo que walmart debe tener de ese producto
fecha_registro datetime DEFAULT current_timestamp
);


CREATE TABLE Inventario(
id_inventario VARCHAR(36) not null primary key DEFAULT(UUID()),
id_producto VARCHAR(36),
FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
id_almacen VARCHAR(36),
FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
cantidad int,
updated datetime DEFAULT current_timestamp -- fecha de actualizacion del ultimo inventario
);

CREATE TABLE Tiendas(
id_tienda VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
telefono varchar(15),
ciudad varchar(100)
);

CREATE TABLE Clientes(
id_cliente VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(100),
apellidos varchar (255),
direccion varchar(255),
telefono varchar(15),
ciudad varchar(100),
email varchar(100),
fecha_registro datetime DEFAULT current_timestamp,
id_usuario VARCHAR(36),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


CREATE TABLE Empleados(
id_empleado VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(100),
apellidos varchar (255),
puesto varchar(100),
id_tienda VARCHAR(36),
FOREIGN KEY (id_tienda) REFERENCES Tiendas(id_tienda),
fecha_contratacion date,
salario double,
id_usuario VARCHAR(36),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);


-- DROP TABLE Usuarios;
Select * from Usuarios;
Select * from Tiendas;
INSERT INTO Tiendas (
    nombre,
    direccion,
    telefono,
    ciudad
) VALUES (
    'Walmart Centro',
    'Av. Juárez 123, Col. Centro',
    '5551234567',
    'Ciudad de México'
);



INSERT INTO Empleados (
    nombre,
    apellidos,
    puesto,
    id_tienda,
    fecha_contratacion,
    salario,
    id_usuario
) VALUES (
    'Noel',
    'Rincón Anaya',
    'Sistemas',
    'cf5837b0-165d-11f0-880e-ee5fda9bf999', -- id_tienda existente
    '2023-11-15',
    8200.50,
    'a9ddf11f-165d-11f0-880e-ee5fda9bf999' -- id_usuario existente
);

INSERT INTO Usuarios (email, contrasena, rol) VALUES
('noelrinaya318@gmail.com', '$2b$10$cu1aanbI5qy5d8LFkbI4f.EZupyIPHQ0qpMb05xCg.UynXOtIoMCK', 'admin');

INSERT INTO Usuarios (email, contrasena, rol) VALUES
('empleado1@miempresa.com', 'secreto456', 'empleado');

INSERT INTO Usuarios (email, contrasena, rol) VALUES
('proveedor_abc@suministros.net', 'pass789', 'proveedor');

INSERT INTO Usuarios (email, contrasena, rol, activo) VALUES
('admin_principal@sistema.org', 'adminseguro', 'admin', TRUE);

INSERT INTO Usuarios (email, contrasena, rol, fecha_creacion, activo) VALUES
('cliente_vip@example.com', 'vip_pass', 'cliente', '2024-12-20 10:30:00', FALSE);



CREATE TABLE Ventas(
id_venta VARCHAR(36) not null primary key DEFAULT(UUID()),
id_cliente VARCHAR(36),
FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
id_tienda VARCHAR(36),
FOREIGN KEY (id_tienda) REFERENCES Tiendas(id_tienda),
id_empleado VARCHAR(36),
FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado),
fecha_venta datetime DEFAULT current_timestamp,
total_venta double
);

CREATE TABLE Detalles_Venta(
id_detalle_venta VARCHAR(36) not null primary key DEFAULT(UUID()),
id_venta VARCHAR(36),
FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta),
id_producto VARCHAR(36),
FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
cantidad int,
precio_unitario double,
subtotal double as (precio_unitario*cantidad)
);



CREATE TABLE Membresia_Walmart(
id_tarjeta VARCHAR(36) not null primary key DEFAULT(UUID()),
id_cliente VARCHAR(36),
FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
puntos int,
numero_tarjeta varchar(16),
expiracion date
);




CREATE TABLE Pedidos_Proveedores(
id_pedido VARCHAR(36) not null primary key DEFAULT(UUID()),
id_proveedor VARCHAR(36),
FOREIGN KEY (id_proveedor) REFERENCES Proveedores(id_proveedor),
fecha_pedido date DEFAULT current_timestamp,
estatus varchar(20),
total_pedido double
);


CREATE TABLE Detalles_Pedido(
id_detalle_pedido VARCHAR(36) not null primary key DEFAULT(UUID()),
id_pedido VARCHAR(36),
id_producto VARCHAR(36),
FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
cantidad int,
precio_unitario double
);





-- CATEGORÍAS
-- INSERT INTO Categorias ( nombre, descripcion) VALUES
-- ( 'Electrónica', 'Dispositivos electrónicos y accesorios'),
-- ('Alimentos', 'Productos alimenticios y bebidas'),
-- ('Limpieza', 'Artículos de limpieza para el hogar');

-- ALMACENES
-- INSERT INTO Almacenes (id_almacen, nombre, direccion, no_productos, capacidad) VALUES
-- ('22222222-2222-2222-2222-222222222221', 'Almacén Central', 'Av. Principal #123, CDMX', 3000, 90),
-- ('22222222-2222-2222-2222-222222222222', 'Almacén Norte', 'Blvd. Norte #456, Monterrey', 1500, 75);

-- PROVEEDORES
-- INSERT INTO Proveedores (id_proveedor, nombre, direccion, telefono, email) VALUES
-- ('33333333-3333-3333-3333-333333333331', 'Samsung México', 'Parque Industrial Samsung, Querétaro', '5551234567', 'ventas@samsung.com'),
-- ('33333333-3333-3333-3333-333333333332', 'Bimbo', 'Calle Panadería #9, CDMX', '5559876543', 'contacto@bimbo.com.mx');

-- PRODUCTOS
-- INSERT INTO Productos (id_producto, nombre, descripcion, precio_unitario, id_categoria, min_stock) VALUES
-- ('44444444-4444-4444-4444-444444444441', 'Televisor 55" 4K', 'Smart TV Samsung UHD', 9999.99, '11111111-1111-1111-1111-111111111111', 10),
-- ('44444444-4444-4444-4444-444444444442', 'Pan de caja', 'Pan blanco rebanado Bimbo', 39.50, '11111111-1111-1111-1111-111111111112', 100),
-- ('44444444-4444-4444-4444-444444444443', 'Detergente líquido', 'Detergente para ropa 5L', 89.90, '11111111-1111-1111-1111-111111111113', 50);

-- INVENTARIO
-- INSERT INTO Inventario (id_inventario, id_producto, id_almacen, cantidad) VALUES
-- ('55555555-5555-5555-5555-555555555551', '44444444-4444-4444-4444-444444444441', '22222222-2222-2222-2222-222222222221', 25),
-- ('55555555-5555-5555-5555-555555555552', '44444444-4444-4444-4444-444444444442', '22222222-2222-2222-2222-222222222221', 500),
-- ('55555555-5555-5555-5555-555555555553', '44444444-4444-4444-4444-444444444443', '22222222-2222-2222-2222-222222222222', 300);

-- TIENDAS
-- INSERT INTO Tiendas (id_tienda, nombre, direccion, telefono, ciudad) VALUES
-- ('66666666-6666-6666-6666-666666666661', 'Walmart Centro', 'Av. Reforma 100, CDMX', '5512345678', 'Ciudad de México'),
-- ('66666666-6666-6666-6666-666666666662', 'Walmart Norte', 'Av. Universidad 300, Monterrey', '8123456789', 'Monterrey');

-- CLIENTES
-- INSERT INTO Clientes (id_cliente, nombre, apellidos, direccion, telefono, ciudad, email) VALUES
-- ('77777777-7777-7777-7777-777777777771', 'Laura', 'Ramírez Gómez', 'Calle Roble 123, CDMX', '5512345678', 'Ciudad de México', 'laura@email.com'),
-- ('77777777-7777-7777-7777-777777777772', 'Carlos', 'López Pérez', 'Av. Insurgentes 456, Monterrey', '8123456789', 'Monterrey', 'carlos@email.com');

-- EMPLEADOS
-- INSERT INTO Empleados (id_empleado, nombre, apellidos, puesto, id_tienda, fecha_contratacion, salario) VALUES
-- ('88888888-8888-8888-8888-888888888881', 'Luis', 'García Torres', 'Cajero', '66666666-6666-6666-6666-666666666661', '2023-05-10', 8000),
-- ('88888888-8888-8888-8888-888888888882', 'Ana', 'Hernández Ruiz', 'Supervisor', '66666666-6666-6666-6666-666666666662', '2022-03-15', 12000);

-- VENTAS
-- INSERT INTO Ventas (id_venta, id_cliente, id_tienda, id_empleado, total_venta) VALUES
-- ('99999999-9999-9999-9999-999999999991', '77777777-7777-7777-7777-777777777771', '66666666-6666-6666-6666-666666666661', '88888888-8888-8888-8888-888888888881', 10039.49),
-- ('99999999-9999-9999-9999-999999999992', '77777777-7777-7777-7777-777777777772', '66666666-6666-6666-6666-666666666662', '88888888-8888-8888-8888-888888888882', 129.90);

-- DETALLES DE VENTA
-- INSERT INTO Detalles_Venta (id_detalle_venta, id_venta, id_producto, cantidad, precio_unitario) VALUES
-- ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '99999999-9999-9999-9999-999999999991', '44444444-4444-4444-4444-444444444441', 1, 9999.99),
-- ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '99999999-9999-9999-9999-999999999991', '44444444-4444-4444-4444-444444444442', 1, 39.50),
-- ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '99999999-9999-9999-9999-999999999992', '44444444-4444-4444-4444-444444444443', 1, 89.90),
-- ('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '99999999-9999-9999-9999-999999999992', '44444444-4444-4444-4444-444444444442', 1, 39.50);

-- MEMBRESÍA WALMART
-- INSERT INTO Membresia_Walmart (id_tarjeta, id_cliente, puntos, numero_tarjeta, expiracion) VALUES
-- ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', '77777777-7777-7777-7777-777777777771', 150, '1234567812345678', '2026-12-31'),
-- ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', '77777777-7777-7777-7777-777777777772', 80, '8765432187654321', '2025-11-30');

-- PEDIDOS A PROVEEDORES
-- INSERT INTO Pedidos_Proveedores (id_pedido, id_proveedor, estatus, total_pedido) VALUES
-- ('ccccccc1-cccc-cccc-cccc-ccccccccccc1', '33333333-3333-3333-3333-333333333331', 'Entregado', 19999.98),
-- ('ccccccc2-cccc-cccc-cccc-ccccccccccc2', '33333333-3333-3333-3333-333333333332', 'Pendiente', 3950.00);

-- DETALLES DE PEDIDO
-- INSERT INTO Detalles_Pedido (id_detalle_pedido, id_pedido, id_producto, cantidad, precio_unitario) VALUES
-- ('ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', '44444444-4444-4444-4444-444444444441', 2, 9999.99),
-- ('ddddddd2-dddd-dddd-dddd-ddddddddddd2', 'ccccccc2-cccc-cccc-cccc-ccccccccccc2', '44444444-4444-4444-4444-444444444442', 100, 39.50);






use defaultdb;
SELECT 
    *
FROM
    Proveedores;

show tables;

-- ALTER USER 'avnadmin'@'%' IDENTIFIED WITH mysql_native_password BY 'AVNS_xntBSi1SLgFCK0XU07B';
-- FLUSH PRIVILEGES;


