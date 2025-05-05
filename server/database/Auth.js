const { dbquery } = require("../MySQL_config");

module.exports = {
  AccountExist: async function (email) {
    const data = await dbquery(`SELECT * FROM Usuarios WHERE email='${email}'`);
    var res = data[0];
    if (res != undefined) {
      if (res.email == email) {
        if (res.rol == "admin" || res.rol == "empleado") {
          const moreinfo = await dbquery(
            `SELECT 
  e.*, 
  t.nombre AS nombre_tienda, 
  t.direccion AS direccion_tienda,
  t.ciudad AS ciudad_tienda,
	t.telefono AS telefono_tienda
FROM Empleados e
JOIN Tiendas t ON e.id_tienda = t.id_tienda
WHERE e.id_usuario = '${res.id_usuario}';`
          );
          var userinfo = moreinfo[0];

          var payload = {
            id_usuario: res.id_usuario,
            email: res.email,
            contrasena: res.contrasena,
            rol: res.rol,
            fecha_creacion: res.fecha_creacion,
            activo: res.activo,
          };
          var new_user_infopayload = {
            id_empleado: userinfo.id_empleado,
            nombre: userinfo.nombre,
            apellidos: userinfo.apellidos,
            puesto: userinfo.puesto,
            id_tienda: userinfo.id_tienda,
            nombre_tienda: userinfo.nombre_tienda,
            direccion_tienda: userinfo.direccion_tienda,
            ciudad_tienda: userinfo.ciudad_tienda,
            telefono_tienda: userinfo.telefono_tienda,
            fecha_contratacion: userinfo.fecha_contratacion,
            salario: userinfo.salario,
            id_usuario: userinfo.id_usuario,
          };
          return { ...payload, ...new_user_infopayload };
        }
        if (res.rol == "cliente") {
          const moreinfo = await dbquery(
            `SELECT * FROM Clientes WHERE id_usuario='${res.id_usuario}'`
          );

          var userinfo = moreinfo[0];

          var payload = {
            id_usuario: res.id_usuario,
            email: res.email,
            contrasena: res.contrasena,
            rol: res.rol,
            fecha_creacion: res.fecha_creacion,
            activo: res.activo,
          };

          var new_user_infopayload = {
            id_cliente: userinfo.id_cliente,
            nombre: userinfo.nombre,
            apellidos: userinfo.apellidos,
            direccion: userinfo.direccion,
            telefono: userinfo.telefono,
            ciudad: userinfo.ciudad,
            fecha_registro: userinfo.fecha_registro,
            id_usuario: userinfo.id_usuario,
          };
          return { ...payload, ...new_user_infopayload };
        }
        if (res.rol == "proveedor") {
          const moreinfo = await dbquery(
            `SELECT * FROM Proveedores WHERE id_usuario='${res.id_usuario}'`
          );

          var userinfo = moreinfo[0];

          var payload = {
            id_usuario: res.id_usuario,
            email: res.email,
            contrasena: res.contrasena,
            rol: res.rol,
            fecha_creacion: res.fecha_creacion,
            activo: res.activo,
          };

          var new_user_infopayload = {
            id_cliente: userinfo.id_cliente,
            nombre: userinfo.nombre,
            apellidos: userinfo.apellidos,
            direccion: userinfo.direccion,
            telefono: userinfo.telefono,
            ciudad: userinfo.ciudad,
            fecha_registro: userinfo.fecha_registro,
            id_usuario: userinfo.id_usuario,
            id_proveedor: userinfo.id_proveedor,
          };
          return { ...payload, ...new_user_infopayload };
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  SignUp: async function ({
    nombre,
    apellidos,
    direccion,
    telefono,
    ciudad,
    email,
    contrasena,
  }) {
    try {
      const results = await dbquery(
        `CALL CrearUsuarioYCliente(?, ?, ?, ?, ?, ?, ?)`,
        [email, contrasena, nombre, apellidos, direccion, telefono, ciudad]
      );
      return { success: true, results };
    } catch (error) {
      console.error("Error en SignUp:", error);
      return { success: false, error };
    }
  },
};
