import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { New_Proveedor } from "../hooks/useProveedores";
import { get_Tiendas } from "../hooks/useAuth";
export const Usuarios = () => {
  const [nombre, setnombre] = useState();
  const [direccion, setdireccion] = useState();
  const [telefono, settelefono] = useState();
  const [email, setemail] = useState();
  const registro_proveedores = useRef(null);
  const [tiendas, settiendas] = useState();
  const [formData, setformData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    rol: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    puesto: "",
    salario: 0,
  });

  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Tiendas();
      data = data.data;
      settiendas(data);
    };
    getData();
  }, [0]);

  const updateFormJson = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  if (tiendas)
    return (
      <>
        <div className="usuarios">
          <ToastContainer />
          <div className="form_container">
            <h1>Registro de Empleados</h1>
            <form action="" className="formulario">
              
              <select name="rol" id="">
                <option value="" selected disabled>
                  Rol en Sistema
                </option>
                <option value="">Cliente</option>
                <option value="">Administrador</option>
                <option value="">Empleado</option>
                <option value="">Proveedor</option>
              </select>
              <input type="text" name="puesto" placeholder="Puesto" />
              <select name="tienda" id="" placeholder="Tienda">
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
              <input type="number" name="salario" placeholder="Salario" />
              <button className="button big yellow">Registrar Usuario</button>
            </form>
          </div>
        </div>
      </>
    );
};
