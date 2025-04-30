import { useEffect, useState } from "react";
import { get_Almacenes } from "../hooks/useInmuebles";
import { FaShop } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Almacenes = () => {
  const [almacenes, setalmacenes] = useState();
  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Almacenes();
      data = data.data;
      setalmacenes(data);
    };
    getData();
  }, [0]);
  if (almacenes)
    return (
      <>
        <div className="almacenes">
          <div className="cards">
            {almacenes.map((almacen) => {
              return (
                <Link
                  key={almacen.id_almacen}
                  to={`/Inventario/${almacen.id_almacen}`}
                >
                  <div className="card">
                    <div className="image">
                      <FaShop />
                    </div>
                    <div className="text">
                      <h3>{almacen.nombre}</h3>
                      <p className="descripcion">{almacen.direccion}</p>
                      <p className="progress_bar_text">
                        Capacidad:{" "}
                        {almacen.no_productos + "/" + almacen.capacidad}
                      </p>
                      <progress
                        value={almacen.no_productos}
                        max={almacen.capacidad}
                        className="progress_bar"
                      ></progress>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
};
