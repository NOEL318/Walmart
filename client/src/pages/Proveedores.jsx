import { useEffect, useState } from "react";
import { get_Proveedores } from "../hooks/useProveedores";
import { ToastContainer, toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";
import {
  buscarClienteUsuarios,
  crear_ProveedordeCliente,
  crearProveedordeCliente,
} from "../hooks/useAuth";
export const Proveedores = () => {
  const [proveedores, setproveedores] = useState();
  const [email, setemail] = useState("");
  const [visible, setvisible] = useState();
  const [emails_encontrados, setemails_encontrados] = useState();
  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Proveedores();
      data = data.data;
      setproveedores(data);
    };
    getData();
  }, [1]);

  const buscar_ClienteUsuarios = async (email) => {
    var res = await buscarClienteUsuarios(email);
    setemails_encontrados(res.data.data);
  };

  const crear_ProveedordeCliente = async () => {
    var res = await crearProveedordeCliente(email);
    console.log(res);
  };

  if (proveedores) {
    return (
      <div className="proveedores">
        <ToastContainer />
        <div className="form_container">
          <h1>Registro de Proveedores</h1>
          <form
            action=""
            className="formulario"
            onSubmit={(e) => {
              e.preventDefault();
              crear_ProveedordeCliente();
            }}
          >
            <input
              type="text"
              value={email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setemail(newEmail);
                buscar_ClienteUsuarios(newEmail !== "" ? newEmail : null);
                setvisible(true);
              }}
              name="email"
              placeholder="Buscar email..."
            />

            {visible && emails_encontrados?.length > 0 && (
              <ul className="email_selector">
                {emails_encontrados.map((emailEncontrado) => (
                  <li
                    onClick={() => {
                      setemail(emailEncontrado.email);
                      setvisible(false);
                    }}
                    key={emailEncontrado.email}
                  >
                    {emailEncontrado.email}
                  </li>
                ))}
              </ul>
            )}

            <button className="button big yellow">Registrar Proveedor</button>
          </form>
        </div>

        <div className="lista">
          <h1>Listado de Proveedores</h1>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Dirección</td>
                <td>Teléfono</td>
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
