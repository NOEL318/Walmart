import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignOut } from "../hooks/userSlice";
import { FaCircle } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { PiIdentificationBadge } from "react-icons/pi";

export const User = ({ user }) => {
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(SignOut());
  };

  return (
    <>
      <div className="user">
        <div className="profile">
          <div className="top-square">
            <div className="left">
              <FiUser />
              <button className="button red big" onClick={logout}>
                Cerrar Sesión
              </button>
            </div>
            <div className="right">
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td>
                      <h3>Nombre: </h3>
                    </td>
                    <td>
                      <p>{user.nombre}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Apellidos</h3>
                    </td>
                    <td>
                      <p>{user.apellidos} </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Email: </h3>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Rol:</h3>
                    </td>
                    <td>
                      <p>{user.rol}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Fecha de Creación:</h3>
                    </td>
                    <td>
                      <p>{user.fecha_creacion}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Estatus Activo:</h3>
                    </td>
                    <td>
                      <p
                        className={`active_status ${
                          user.activo ? "true" : "false"
                        }`}
                      >
                        <FaCircle />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {user.rol == "empleado" ||
            (user.rol == "admin" && (
              <div className="empleado">
                <div className="info">
                  <div className="left">
                    <PiIdentificationBadge />
                  </div>
                  <div className="right">
                    <table>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td>
                            <h3>Puesto: </h3>
                          </td>
                          <td>
                            <p>{user.puesto}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h3>Salario:</h3>
                          </td>
                          <td>
                            <p>${user.salario}mxn.</p>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h3>Id_Empleado: </h3>
                          </td>
                          <td>
                            <p>{user.id_empleado}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tienda">
                  <div className="containers">
                    <div className="left">
                      <FaShop />
                    </div>
                    <div className="right">
                      <h1>Tienda: </h1>
                      <table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td>
                              <h3>Id_Tienda: </h3>
                            </td>
                            <td>
                              <p>{user.id_tienda}</p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <h3>Nombre: </h3>
                            </td>
                            <td>
                              <p>{user.nombre_tienda}</p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <h3>Dirección: </h3>
                            </td>
                            <td>
                              <p>{user.direccion}</p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <h3>Teléfono: </h3>
                            </td>
                            <td>
                              <p>{user.telefono}</p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <h3>Ciudad: </h3>
                            </td>
                            <td>
                              <p>{user.ciudad}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
