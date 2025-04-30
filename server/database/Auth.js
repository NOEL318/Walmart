const { dbquery } = require("../MySQL_config");

module.exports = {
  AccountExist: async function (email) {
    const data = await dbquery(`SELECT * FROM Usuarios WHERE email='${email}'`);
    var res = data[0];
    if (res != undefined) {
      if (res.email == email) {
        if (res.rol == "admin") {
          const moreinfo = await dbquery(
            `SELECT * FROM Empleados WHERE id_usuario='${res.id_usuario}'`
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
    console.log(contrasena);
    const results = await dbquery(
      `CALL CrearUsuarioYCliente(?, ?, ?, ?, ?, ?, ?)`,
      [email, contrasena, nombre, apellidos, direccion, telefono, ciudad]
    );
    console.log(results);
  },
};
