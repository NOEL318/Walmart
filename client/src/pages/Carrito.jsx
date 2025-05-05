import { useEffect, useState } from "react";

export const Carrito = () => {
  const [carrito, setcarrito] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    if (storedCart) {
      setcarrito(JSON.parse(storedCart));
    }
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem("carrito", JSON.stringify(newCart));
    setcarrito(newCart);
  };

  const increaseQty = (id) => {
    const updatedCart = carrito.map((item) =>
      item.id_producto === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    saveCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = carrito
      .map((item) =>
        item.id_producto === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);
    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = carrito.filter((item) => item.id_producto !== id);
    saveCart(updatedCart);
  };

  if (carrito)
    return (
      <div className="carrito">
        <h1>Carrito de Compras</h1>
        {carrito.length > 0 ? (
          <div className="items-list">
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id_producto}>
                  <div className="img">
                    <img src={producto.img_url} alt={producto.nombre} />
                  </div>
                  <div className="text">
                    <h2 className="nombre">{producto.nombre}</h2>
                    <div className="cantidad">
                      Cantidad: {producto.cantidad}
                    </div>
                    <div className="actions">
                      <button
                        className="button small yellow"
                        onClick={() => increaseQty(producto.id_producto)}
                      >
                        +
                      </button>
                      <button
                        className="button small blue"
                        onClick={() => decreaseQty(producto.id_producto)}
                      >
                        -
                      </button>
                      <button
                        className="button small red"
                        onClick={() => removeItem(producto.id_producto)}
                      >
                        Eliminar del Carrito
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>No tienes artículos en tu carrito</h1>
        )}
        {carrito.length > 0 && (
          <button className="button big yellow">Finalizar Compra</button>
        )}
      </div>
    );
};
