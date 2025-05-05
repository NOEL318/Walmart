-- create database defaultdb;
-- drop database defaultdb;
create database defaultdb;
use defaultdb;


CREATE TABLE Categorias(
id_categoria VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
descripcion varchar(255)
);

CREATE TABLE Usuarios (
    id_usuario VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT(UUID()),
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'empleado', 'proveedor', 'admin') NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Almacenes(
id_almacen VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
no_productos int, -- numero de productos que tiene
capacidad int -- porcentaje de capacidad
);


CREATE TABLE Proveedores(
id_proveedor VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
telefono varchar(15),
id_usuario VARCHAR(36),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

create table Productos(
id_producto VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
descripcion varchar(255),
img_url VARCHAR(500),
precio_unitario double,
id_categoria varchar(36),
FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria),
min_stock int,
fecha_registro datetime DEFAULT current_timestamp
);

CREATE TABLE Tiendas(
id_tienda VARCHAR(36) not null primary key DEFAULT(UUID()),
nombre varchar(255),
direccion varchar(255),
telefono varchar(15),
ciudad varchar(100)
);

CREATE TABLE Inventario(
id_inventario VARCHAR(36) not null primary key DEFAULT(UUID()),
id_producto VARCHAR(36),
FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
id_tienda VARCHAR(36),
FOREIGN KEY (id_tienda) REFERENCES Tienda(id_tienda),
id_almacen VARCHAR(36),
FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
cantidad int,
updated datetime DEFAULT current_timestamp -- fecha de actualizacion del ultimo inventario
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
fecha_pedido datetime DEFAULT current_timestamp,
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



SELECT 
    *
FROM
    Proveedores;
SELECT 
    *
FROM
    Productos;

SELECT 
    *
FROM
    Categorias;
    
    

DELETE FROM Productos;



DELIMITER $$

CREATE PROCEDURE CrearUsuarioYCliente(
    IN p_email VARCHAR(100),
    IN p_contrasena VARCHAR(255),
    IN p_nombre_cliente VARCHAR(100),
    IN p_apellidos_cliente VARCHAR(255),
    IN p_direccion_cliente VARCHAR(255),
    IN p_telefono_cliente VARCHAR(15),
    IN p_ciudad_cliente VARCHAR(100)
)
BEGIN
    DECLARE v_id_usuario VARCHAR(36);

    -- Generar UUID manualmente
    SET v_id_usuario = UUID();

    -- Insertar en la tabla Usuarios con el UUID generado
    INSERT INTO Usuarios (id_usuario, email, contrasena, rol)
    VALUES (v_id_usuario, p_email, p_contrasena, 'cliente');

    -- Insertar en la tabla Clientes con la FK correcta
    INSERT INTO Clientes (nombre, apellidos, direccion, telefono, ciudad, id_usuario)
    VALUES (p_nombre_cliente, p_apellidos_cliente, p_direccion_cliente, p_telefono_cliente, p_ciudad_cliente, v_id_usuario);

    -- Devolver ID
    SELECT v_id_usuario AS id_usuario;
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS CrearUsuarioYCliente;



show tables;
SET SQL_SAFE_UPDATES = 0;
DELETE FROM Productos;

-- ALTER USER 'avnadmin'@'%' IDENTIFIED WITH mysql_native_password BY 'AVNS_xntBSi1SLgFCK0XU07B';
-- FLUSH PRIVILEGES;


