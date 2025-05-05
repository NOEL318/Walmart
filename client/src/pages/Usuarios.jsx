import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";
import {
  buscarClienteUsuarios,
  crearEmpleadodeCliente,
  get_Tiendas,
  obtenerUsuarios,
} from "../hooks/useAuth";
export const Usuarios = () => {
  const [tiendas, settiendas] = useState();
  const [emails_encontrados, setemails_encontrados] = useState();
  const [email, setemail] = useState("");
  const [visible, setvisible] = useState();
  const [usuarios, setusuarios] = useState();
  const [formData, setformData] = useState({
    email: "",
    rol: "",
    puesto: "",
    salario: 0,
    id_tienda: "",
  });

  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Tiendas();
      var users = await obtenerUsuarios();
      setusuarios(users.data.data);
      data = data.data;
      settiendas(data);
    };
    getData();
  }, [0]);

  const updateFormEmpleadosJson = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const buscar_ClienteUsuarios = async (email) => {
    var res = await buscarClienteUsuarios(email);
    setemails_encontrados(res.data.data);
  };

  const crear_EmpleadodeCliente = async () => {
    var res = await crearEmpleadodeCliente(formData);
  };

  if (tiendas)
    return (
      <>
        <div className="usuarios">
          <ToastContainer />
          <div className="form_container">
            <h1>Registro de Empleados</h1>
            <form
              action=""
              className="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                crear_EmpleadodeCliente();
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
                        setformData((prev) => ({
                          ...prev,
                          email: emailEncontrado.email,
                        }));
                      }}
                      key={emailEncontrado.email}
                    >
                      {emailEncontrado.email}
                    </li>
                  ))}
                </ul>
              )}

              <select name="rol" id="" onChange={updateFormEmpleadosJson}>
                <option value="" selected disabled>
                  Rol en Sistema
                </option>
                <option value="admin">Administrador</option>
                <option value="empleado">Empleado</option>
              </select>
              <input
                type="text"
                onChange={updateFormEmpleadosJson}
                name="puesto"
                placeholder="Puesto"
              />
              <select
                name="id_tienda"
                onChange={updateFormEmpleadosJson}
                id=""
                placeholder="Tienda"
              >
                <option value="" selected disabled>
                  Tienda
                </option>
                {tiendas.map((tienda) => {
                  return (
                    <option key={tienda.id_tienda} value={tienda.id_tienda}>
                      {tienda.nombre}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                onChange={updateFormEmpleadosJson}
                name="salario"
                placeholder="Salario"
              />

              <button className="button big yellow">Registrar Usuario</button>
            </form>
          </div>

          <table>
            <thead>
              <tr>
                <td>Estatus</td>
                <td>Email</td>
                <td>Fecha Creación</td>
                <td>Rol</td>
                <td>UUID</td>
              </tr>
            </thead>
            <tbody>
              {usuarios &&
                usuarios.map((usuario) => {
                  return (
                    <tr key={usuario.id_usuario}>
                      <td
                        className={`active_status ${
                          usuario.activo ? "true" : "false"
                        }`}
                      >
                        <FaCircle />
                      </td>
                      <td>{usuario.email}</td>
                      <td>{usuario.fecha_creacion}</td>
                      <td>{usuario.rol}</td>
                      <td>{usuario.id_usuario}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
};
