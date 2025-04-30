import { useEffect, useState } from "react";
import { create_Almacen, create_Tienda } from "../hooks/useInmuebles";
import { ToastContainer, toast } from "react-toastify";

export const Inmuebles = () => {
  const [formAlmacen, setformAlmacen] = useState({
    nombre: "",
    direccion: "",
    no_productos: 0,
    capacidad: 0,
  });

  const [formTienda, setformTienda] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    ciudad: "",
  });

  const createAlmacen = async () => {
    var response = await create_Almacen(formAlmacen);
    console.log(response, "response");
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  const createTienda = async () => {
    var response = await create_Tienda(formTienda);
    console.log(response, "response");
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  useEffect(() => {
    console.log(formAlmacen);
  }, [formAlmacen]);
  const updateAlmacenJson = (e) => {
    const { name, value } = e.target;
    setformAlmacen((prev) => ({ ...prev, [name]: value }));
  };

  const updateTiendaJson = (e) => {
    const { name, value } = e.target;
    setformTienda((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="inmuebles">
        <div className="form_container">
          <h1>Registro de Almacenes</h1>
          <form
            action=""
            className="formulario"
            onSubmit={(e) => {
              e.preventDefault();
              createAlmacen();
            }}
          >
            <input
              type="text"
              onChange={updateAlmacenJson}
              name="nombre"
              placeholder="Nombre"
            />
            <input
              type="text"
              onChange={updateAlmacenJson}
              name="direccion"
              placeholder="Dirección"
            />
            <input
              type="number"
              name="no_productos"
              placeholder="No. Productos"
              onChange={updateAlmacenJson}
            />
            <input
              type="number"
              onChange={updateAlmacenJson}
              name="capacidad"
              placeholder="Capacidad"
            />
            <button className="button big yellow">Registrar Almacén</button>
          </form>
        </div>

        <div className="form_container">
          <h1>Registro de Tiendas</h1>
          <form
            action=""
            className="formulario"
            onSubmit={(e) => {
              e.preventDefault();
              createTienda();
            }}
          >
            <input
              type="text"
              name="nombre"
              onChange={updateTiendaJson}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="direccion"
              onChange={updateTiendaJson}
              placeholder="Dirección"
            />
            <input
              type="tel"
              name="telefono"
              onChange={updateTiendaJson}
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="ciudad"
              onChange={updateTiendaJson}
              placeholder="Ciudad"
            />
            <button className="button big yellow">Registrar Tienda</button>
          </form>
        </div>
      </div>
    </>
  );
};
