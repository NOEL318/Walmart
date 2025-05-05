import { useEffect, useState } from "react";
import { actualizar_Pedido, get_Pedido } from "../hooks/useProveedores";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Pedido = () => {
  const [pedido, setpedido] = useState([]);
  var { id_pedido } = useParams();
  useEffect(() => {
    const getData = async () => {
      var ped = await get_Pedido(id_pedido);
      if (ped) {
        console.log("oeds", ped);
        setpedido(ped.data.data);
      }
    };
    getData();
  }, [0]);

  const pedidoInfo = pedido[0];

  const update_Pedido = async (estatus) => {
    var res = await actualizar_Pedido({ id_pedido, estatus });
    if (res.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  if (pedido && pedidoInfo)
    return (
      <div className="pedido">
        <h1>Descripción de Pedido</h1>
        <div className="descripcion">
          <table>
            <tbody>
              <tr>
                <td>ID de Pedido</td>
                <td>{pedidoInfo.id_pedido}</td>
              </tr>
              <tr>
                <td>Fecha de Pedido</td>
                <td>{new Date(pedidoInfo.fecha_pedido).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Estatus</td>
                <td>{pedidoInfo.estatus}</td>
              </tr>
              <tr>
                <td>Total del Pedido</td>
                <td>${pedidoInfo.total_pedido}</td>
              </tr>
            </tbody>
          </table>

          <br />

          <table>
            <tbody>
              <tr>
                <td>Nombre del Proveedor</td>
                <td>{pedidoInfo.proveedor_nombre}</td>
              </tr>
              <tr>
                <td>Dirección</td>
                <td>{pedidoInfo.proveedor_direccion}</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>{pedidoInfo.proveedor_telefono}</td>
              </tr>
            </tbody>
          </table>

          <br />

          <h2>Productos del Pedido</h2>
          <table>
            <thead>
              <tr>
                <td>Producto</td>
                <td>Cantidad</td>
                <td>Precio Unitario</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {pedido.map((p, i) => (
                <tr key={i}>
                  <td>{p.producto_nombre}</td>
                  <td>{p.cantidad}</td>
                  <td>${p.precio_unitario}</td>
                  <td>${p.cantidad * p.precio_unitario}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <div className="buttons_group">
            <button
              className="button big yellow"
              onClick={() => update_Pedido("En Proceso")}
            >
              Marcar en Proceso
            </button>
            <button
              className="button big blue"
              onClick={() => update_Pedido("Completado")}
            >
              Marcar como Completo
            </button>
          </div>
        </div>
      </div>
    );
};
