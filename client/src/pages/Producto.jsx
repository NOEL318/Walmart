import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_Producto, get_ProductoenInventario } from "../hooks/useProductos";
import { toast } from "react-toastify";

export const Producto = () => {
  var { id_producto } = useParams();
  const [producto, setproducto] = useState();
  const [inventario, setinventario] = useState();
  const [cantidad, setcantidad] = useState(0);
  const [cantidadValida, setcantidadValida] = useState(true);

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
  }, [id_producto]);

  const addtoCarrito = async () => {
    // Verificar si la cantidad es válida
    const totalStock = inventario.reduce(
      (total, sucursal) => total + sucursal.cantidad,
      0
    );

    if (cantidad <= 0 || cantidad > totalStock) {
      toast.error(
        "No hay suficiente inventario disponible para esta cantidad."
      );
      setcantidadValida(false);
      return;
    }

    const existente = localStorage.getItem("carrito");
    const nuevoItem = { ...producto, cantidad };

    if (existente) {
      let newcart = JSON.parse(existente);

      const index = newcart.findIndex(
        (item) => item.id_producto === nuevoItem.id_producto
      );
      if (index !== -1) {
        newcart[index].cantidad += nuevoItem.cantidad;
      } else {
        newcart.push(nuevoItem);
      }
      localStorage.setItem("carrito", JSON.stringify(newcart));
    } else {
      localStorage.setItem("carrito", JSON.stringify([nuevoItem]));
    }
    toast.success("Se ha agregado al carrito de compras.");
    setcantidadValida(true); // Restablecer estado de validez
  };

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
              <h2>${producto.precio_unitario} MXN</h2>

              <input
                type="number"
                placeholder="Cantidad"
                onChange={(e) => setcantidad(parseInt(e.target.value))}
                value={cantidad}
              />
              <button
                className="button big yellow"
                disabled={!cantidad}
                onClick={addtoCarrito}
              >
                Agregar a Carrito
              </button>
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
                        <tr key={sucursal.id_sucursal}>
                          <td>{sucursal.nombre_tienda}</td>
                          <td>{sucursal.cantidad}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h4>
                  Actualmente las tiendas no tienen este producto en inventario.
                </h4>
              )}
            </div>
          </div>
        </div>
      </>
    );
};
