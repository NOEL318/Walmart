import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  add_To_Almacen_Inventario,
  get_Inventario,
} from "../hooks/useInventario";
import SyncLoader from "react-spinners/SyncLoader";
import { get_Productos } from "../hooks/useProductos";
import { Modal } from "../components/Modal";
import { toast } from "react-toastify";
import { get_Tiendas } from "../hooks/useAuth";

export const Inventario = () => {
  var { id_almacen } = useParams();
  const [inventario, setinventario] = useState();
  const [almacen, setalmacen] = useState();
  const [productos, setproductos] = useState();
  const [product_propositions, setproduct_propositions] = useState();
  const [cantidad, setcantidad] = useState();
  const [showModal, setshowModal] = useState();
  const [selectedproduct, setselectedproduct] = useState();
  const [tiendas, settiendas] = useState();
  const [tienda, settienda] = useState();
  useEffect(() => {
    const getData = async () => {
      var products = await get_Productos();
      products = products.data.data;
      setproduct_propositions(products);
      if (id_almacen) {
        var { data } = await get_Inventario(id_almacen);
        data = data.data;
        console.log(data);
        setalmacen(data.almacen);
        setinventario(data.inventario);
      }
      if (!tiendas) {
        var { data } = await get_Tiendas();
        data = data.data;
        settiendas(data);
      }
    };
    getData();
  }, [0]);

  const addToAlmacenInventario = async () => {
    if (cantidad) {
      var formProductJson = {
        id_producto: selectedproduct.id_producto,
        id_almacen: almacen.id_almacen,
        cantidad: parseInt(cantidad),
        id_tienda: tienda,
      };
      var response = await add_To_Almacen_Inventario(formProductJson);
      console.log("response", response);
      if (response.status == 200) {
        toast("Registrado Exitósamente", { type: "success" });
        setshowModal(false);
        window.location.reload();
      } else {
        toast("No se ha registrado", { type: "error" });
      }
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  if (inventario && product_propositions && tiendas) {
    return (
      <>
        <Modal
          title={"Cantidad A Ingresar a Almacen"}
          type={"success"}
          close_text={"Cerrar"}
          showModal={showModal}
          body={
            <>
              {selectedproduct && <img src={selectedproduct.img_url} alt="" />}
              <input
                type="number"
                placeholder="Cantidad"
                onChange={(e) => setcantidad(e.target.value)}
              />
              <select
                name="tienda"
                onChange={(e) => settienda(e.target.value)}
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
            </>
          }
          action={
            <button
              className="button big blue"
              onClick={() => addToAlmacenInventario()}
            >
              Agregar
            </button>
          }
          setshowModal={setshowModal}
        />
        <div className="inventario">
          <h1>Inventario de {almacen.nombre}</h1>

          {inventario.length > 0 && (
            <table>
              <thead>
                <tr>
                  <td>Cantidad</td>
                  <td>Nombre</td>
                  <td>Precio Unitario</td>
                  <td>Stock Mínimo</td>
                  <td>Actualizado</td>
                </tr>
              </thead>
              <tbody>
                {inventario.map((elemento) => {
                  const fechaUTC = elemento.updated;
                  const fecha = new Date(fechaUTC);

                  // Ajustar la hora de UTC a la zona horaria local (CDMX = UTC - 6)
                  fecha.setHours(fecha.getHours() - 6); // Restar 6 horas para la zona horaria de CDMX

                  // Formatear la fecha y hora
                  const fechaFormateada = fecha.toLocaleString("es-MX", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // AM/PM
                  });

                  return (
                    <tr key={elemento.id_producto}>
                      <td>{elemento.cantidad}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.precio_unitario}</td>
                      <td>{elemento.min_stock}</td>
                      <td>{fechaFormateada}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <h1>Agregar Productos a Inventario</h1>
          <div className="cards">
            {product_propositions.map((producto) => {
              return (
                <div className="card" key={producto.id_producto}>
                  <div className="image">
                    <img src={producto.img_url} alt="" />
                  </div>
                  <div className="text">
                    <h2>{producto.nombre}</h2>
                    <div className="descripcion">
                      <p>{producto.descripcion}</p>
                    </div>
                    <div className="precio">
                      <div className="bubble">
                        <h3>${producto.precio_unitario}mxn.</h3>
                      </div>
                      <div className="bubble add">
                        <h3
                          onClick={() => {
                            setselectedproduct(producto);
                            setshowModal(true);
                          }}
                        >
                          Agregar
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="loader">
        <SyncLoader color="#ffffff" margin={0} size={50} />
      </div>
    );
  }
};
