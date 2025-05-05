import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { get_Productos } from "../hooks/useProductos";
import { Link } from "react-router-dom";

export const Home = ({ user }) => {
  const [showModal, setshowModal] = useState(false);
  const [productos, setproductos] = useState();
  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Productos();
      data = data.data;
      setproductos(data);
      console.log(data);
    };
    getData();
  }, [0]);

  if (productos)
    return (
      <>
        <Modal
          title={"Advertencia"}
          type={"success"}
          close_text={"Cerrar"}
          showModal={showModal}
          setshowModal={setshowModal}
        />

        <div className="home">
          <h1>Productos</h1>
          <div className="products_container">
            <div className="cards">
              {productos.map((producto) => {
                return (
                  <Link to={`/Producto/${producto.id_producto}`}>
                    <div className="card">
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
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
};
