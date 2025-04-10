import { useEffect, useState } from "react";
import { get_Proveedores, New_Proveedor } from "../hooks/useProveedores";
import { data } from "react-router-dom";

export const Proveedores = () => {
  const [nombre, setnombre] = useState();
  const [direccion, setdireccion] = useState();
  const [telefono, settelefono] = useState();
  const [email, setemail] = useState();
  const [proveedores, setproveedores] = useState();
  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Proveedores();
      data = data.data;
      setproveedores(data);
      console.log(data);
    };
    getData();
  }, [1]);
  if (proveedores)
    return (
      <div className="proveedores">
        <div className="registro">
          <h1>Registro de Proveedores</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await New_Proveedor({ nombre, direccion, telefono, email });
            }}
            className="formulario"
          >
            <input
              type="text"
              placeholder="Nombre"
              required
              onChange={(e) => setnombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dirección"
              required
              onChange={(e) => setdireccion(e.target.value)}
            />
            <input
              type="phone"
              placeholder="Teléfono"
              required
              onChange={(e) => settelefono(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              required
              onChange={(e) => setemail(e.target.value)}
            />
            <button type="submit" className="button big yellow">
              Registrar Proveedor
            </button>
          </form>

          <h1>Listado de Proveedores</h1>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Dirección</td>
                <td>Teléfono</td>
                <td>Email</td>
                <td>UUID</td>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => {
                return (
                  <tr>
                    <td>{proveedor.id_proveedor}</td>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.direccion}</td>
                    <td>{proveedor.telefono}</td>
                    <td>{proveedor.email}</td>
                    <td>{proveedor.id_usuario}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
};
