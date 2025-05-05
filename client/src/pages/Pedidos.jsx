import { useEffect, useState } from "react";
import { get_Pedidos_Proveedor } from "../hooks/useProveedores";
import { Link } from "react-router-dom";

export const Pedidos = ({ user }) => {
  const [pedidos, setpedidos] = useState();
  useEffect(() => {
    const getData = async () => {
      if (user) {
        var peds = await get_Pedidos_Proveedor(user.id_proveedor);
        console.log(peds);
        setpedidos(peds.data.data);
      }
    };
    getData();
  }, [0]);
  if (pedidos)
    return (
      <div className="pedidos">
        <h1>Pedidos: </h1>
        <table>
          <thead>
            <tr>
              <td>Id_Pedido</td>

              <td>Fecha de Pedido</td>
              <td>Estatus</td>
              <td>Total</td>
              <td>Opciones</td>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              console.log(pedido, "pedido");
              return (
                <tr
                  className={`${
                    pedido.estatus == "En Proceso"
                      ? "yellow"
                      : pedido.estatus == "Pendiente"
                      ? "red"
                      : "green"
                  }`}
                >
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.fecha_pedido}</td>
                  <td>{pedido.estatus}</td>
                  <td>${pedido.total_pedido}mxn</td>
                  <td>
                    <Link to={`/Pedido/${pedido.id_pedido}`}>
                      <button className="button big blue">Ver Más</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};
