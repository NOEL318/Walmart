import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";
import {
  buscarClienteUsuarios,
  crearEmpleadodeCliente,
  get_Tiendas,
  obtenerUsuarios,
  tramitarMembresia,
} from "../hooks/useAuth";
export const Usuarios = () => {
  const [tiendas, settiendas] = useState();
  const [emails_encontrados, setemails_encontrados] = useState();
  const [email, setemail] = useState("");
  const [visible, setvisible] = useState();
  const [usuarios, setusuarios] = useState();
  const [membresiaFormData, setmembresiaFormData] = useState({
    id_cliente: "",
    puntos: 0,
    numero_tarjeta: "",
    expiracion: "",
  });
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
    console.log(membresiaFormData);
    getData();
  }, [0]);

  const updateFormEmpleadosJson = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const updateMembresiaFormJson = (data) => {
    setmembresiaFormData((prev) => ({ ...prev, ...data }));
  };

  const buscar_ClienteUsuarios = async (email) => {
    var res = await buscarClienteUsuarios(email);
		setemails_encontrados(res.data.data);
  };

  const crear_EmpleadodeCliente = async () => {
    var res = await crearEmpleadodeCliente(formData);
    if (res.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  const tramitar_MembresiaCliente = async () => {
    var res = await tramitarMembresia(membresiaFormData);
    if (res.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  function generarTarjeta(banco = "visa") {
    const bin = banco === "amex" ? "34" : banco === "mastercard" ? "51" : "4";
    const len = banco === "amex" ? 15 : 16;
    let num =
      bin +
      Array(len - bin.length - 1)
        .fill(0)
        .map(() => (Math.random() * 10) | 0)
        .join("");
    const sum = num
      .split("")
      .reverse()
      .map((d, i) => {
        d = +d;
        if (i % 2 === 0) d *= 2;
        return d > 9 ? d - 9 : d;
      })
      .reduce((a, b) => a + b, 0);
    const final = num + ((10 - (sum % 10)) % 10);
    const mes = ((Math.random() * 12 + 1) | 0).toString().padStart(2, "0");
    const año = new Date().getFullYear() + ((Math.random() * 5) | 0);
    const cvc = Array(banco === "amex" ? 4 : 3)
      .fill(0)
      .map(() => (Math.random() * 10) | 0)
      .join("");
    updateMembresiaFormJson({
      numero_tarjeta: final,
      expiracion: `${mes}/${año}`,
    });
  }

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

          <div className="form_container">
            <h1>Tramitar Membresía Walmart</h1>
            <form
              action=""
              className="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                tramitar_MembresiaCliente();
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
                        generarTarjeta();
                        updateMembresiaFormJson({
                          id_cliente: emailEncontrado.id_cliente,
                        });
                      }}
                      key={emailEncontrado.email}
                    >
                      {emailEncontrado.email}
                    </li>
                  ))}
                </ul>
              )}

              <input
                type="text"
                name="puntos"
                disabled
                defaultValue={0}
                placeholder="Puntos Iniciales"
              />

              <input
                type="text"
                name="numero_tarjeta"
                placeholder="Tarjeta"
                disabled
                defaultValue={membresiaFormData.numero_tarjeta}
              />

              <button className="button big yellow">Tramitar Membresía</button>
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
