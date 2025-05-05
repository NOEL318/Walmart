import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_Producto, get_ProductoenInventario } from "../hooks/useProductos";

export const Producto = () => {
  var { id_producto } = useParams();
  const [producto, setproducto] = useState();
  const [inventario, setinventario] = useState();

  useEffect(() => {
    const getData = async (id_prod) => {
      var { data } = await get_Producto(id_prod);
      var stock = await get_ProductoenInventario(id_prod);
      data = data.data;
      setproducto(data[0]);
      setinventario(stock.data.data);
    };
    if (id_producto) {
      getData(id_producto);
    }
  }, [0]);

  if (producto)
    return (
      <>
        <div className="product_page">
          <div className="product">
            <div className="image">
              <img src={producto.img_url} alt="" />
            </div>
            <div className="info">
              <h1>{producto.nombre}</h1>
              <p className="description">{producto.descripcion}</p>
              <h2>${producto.precio_unitario}mxn</h2>
              <h4>Disponibilidad: </h4>
              {inventario ? (
                <table>
                  <thead>
                    <tr>
                      <td>Tienda</td>
                      <td>Cantidad</td>
                    </tr>
                  </thead>
                  <tbody>
                    {inventario.map((sucursal) => {
                      return (
                        <tr>
                          <td>{sucursal.nombre_tienda}</td>
                          <td>{sucursal.cantidad}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h4>
                  Actualmente Las Tiendas No Tienen Este Producto En Inventario
                </h4>
              )}
            </div>
          </div>
        </div>
      </>
    );
};
