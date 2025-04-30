import { useEffect, useState } from "react";
import { get_Proveedores } from "../hooks/useProveedores";
import { ToastContainer, toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

export const Proveedores = () => {
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

  if (proveedores) {
    return (
      <div className="proveedores">
        <ToastContainer />

        <div className="lista">
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
                  <tr key={proveedor.id_proveedor}>
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
  } else {
    return (
      <div className="loader">
        <SyncLoader color="#ffffff" margin={0} size={50} />
      </div>
    );
  }
};
