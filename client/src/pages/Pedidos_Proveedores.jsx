import { useEffect, useState } from "react";
import {
  crear_Pedido_Proveedor,
  get_Pedidos,
  get_Proveedores,
} from "../hooks/useProveedores";
import { get_ProductosProveedor } from "../hooks/useProductos";
import { toast } from "react-toastify";

export const Pedidos_Proveedores = () => {
  const [proveedores, setproveedores] = useState();
  const [productos, setproductos] = useState();
  const [pedidos, setpedidos] = useState();
  const [formData, setformData] = useState({
    id_proveedor: "",
    estatus: "Pendiente",
    total_pedido: 0,
    productos: [],
  });

  useEffect(() => {
    const getData = async () => {
      var provs = await get_Proveedores();
      var peds = await get_Pedidos();
      if (peds) {
        console.log("oeds", peds);
        setpedidos(peds.data.data);
      }

      setproveedores(provs.data.data);
      if (proveedores) {
        var prodts = await get_ProductosProveedor(formData.id_proveedor);
        setproductos(prodts.data.data);
      }
    };
    getData();
  }, [formData]);

  const crear_pedido = async () => {
    var res = await crear_Pedido_Proveedor(formData);
    console.log(res);
    if (res.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  const updateFormJson = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  if (proveedores && pedidos)
    return (
      <div className="pedidos_proveedores">
        <div className="form_container">
          <h1>Pedidos a Proveedores</h1>
          <form
            action="
				"
            className="forulario"
            onSubmit={(e) => {
              e.preventDefault();
              crear_pedido();
            }}
          >
            <select
              name="id_proveedor"
              onChange={updateFormJson}
              defaultValue={""}
              required
            >
              <option value="" disabled>
                Proveedores
              </option>
              {proveedores.map((proveedor) => {
                return (
                  <option
                    key={proveedor.id_proveedor}
                    value={proveedor.id_proveedor}
                  >
                    {proveedor.nombre}
                  </option>
                );
              })}
            </select>
            {productos && (
              <div className="checklist">
                {productos.map((producto) => (
                  <div key={producto.id_producto}>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.productos.some(
                          (p) => p.id_producto === producto.id_producto
                        )}
                        className="checkbox"
                        onChange={() => {
                          const yaSeleccionado = formData.productos.find(
                            (p) => p.id_producto === producto.id_producto
                          );

                          if (yaSeleccionado) {
                            setformData({
                              ...formData,
                              productos: formData.productos.filter(
                                (p) => p.id_producto !== producto.id_producto
                              ),
                            });
                          } else {
                            setformData({
                              ...formData,
                              productos: [
                                ...formData.productos,
                                {
                                  id_producto: producto.id_producto,
                                  cantidad: 1,
                                  precio_unitario: producto.precio_unitario,
                                },
                              ],
                            });
                          }
                        }}
                      />
                      {producto.nombre} - ${producto.precio_unitario}
                    </label>
                  </div>
                ))}
                {formData.productos.map((p, index) => (
                  <div key={p.id_producto}>
                    <label>
                      Cantidad para{" "}
                      {
                        productos.find(
                          (prod) => prod.id_producto === p.id_producto
                        )?.nombre
                      }
                      :
                      <input
                        type="number"
                        min="1"
                        onChange={(e) => {
                          const cantidad = parseInt(e.target.value) || 0;
                          const updated = [...formData.productos];
                          updated[index].cantidad = cantidad;
                          const total = updated.reduce((acc, producto) => {
                            const c = producto.cantidad || 0;
                            const precio = producto.precio_unitario || 0;
                            return acc + c * precio;
                          }, 0);

                          setformData({
                            ...formData,
                            productos: updated,
                            total_pedido: total,
                          });
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}
            {formData.productos.length > 0 && (
              <button className="button big yellow">
                Realizar Pedido a Proveedor
              </button>
            )}
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <td>Id_Pedido</td>
              <td>Nombre de Proveedor</td>
              <td>Teléfono de Proveedor</td>
              <td>Fecha de Pedido</td>
              <td>Estatus</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              console.log(pedido, "pedido");
              return (
                <tr>
                  <td>{pedido.id_pedido}</td>
                  <td>{pedido.proveedor_nombre}</td>
                  <td>{pedido.proveedor_telefono}</td>
                  <td>{pedido.fecha_pedido}</td>
                  <td>{pedido.estatus}</td>
                  <td>${pedido.total_pedido}mxn</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
};
