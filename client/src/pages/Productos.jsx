import { useEffect, useState } from "react";
import {
  get_Categorias,
  create_Category,
  create_Product,
} from "../hooks/useProductos";
import { toast } from "react-toastify";

export const Productos = () => {
  const [formData, setformData] = useState({
    nombre: "",
    descripcion: "",
    img_url: "",
    id_categoria: "",
    precio_unitario: 0,
    min_stock: 0,
  });

  const [categoryform, setcategoryform] = useState({
    nombre: "",
    descripcion: "",
  });

  const [categorias, setcategorias] = useState();

  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Categorias();
      data = data.data;
      setcategorias(data);
    };
    getData();
  }, [0]);

  const updateFormJson = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  const updateCatFormJson = (e) => {
    const { name, value } = e.target;
    setcategoryform((prev) => ({ ...prev, [name]: value }));
  };

  const createCategory = async () => {
    var response = await create_Category(categoryform);
    console.log("response", response);
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  const createProduct = async () => {
    var response = await create_Product(formData);
    console.log("response", response);
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    }
  };
  if (categorias) {
    return (
      <>
        <div className="productos">
          <div className="form_container">
            <h1>Registro de Categorías</h1>
            <form
              action=""
              className="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                createCategory();
              }}
            >
              <input
                type="text"
                name="nombre"
                required
                onChange={updateCatFormJson}
                placeholder="Nombre"
              />
              <input
                type="text"
                required
                name="descripcion"
                onChange={updateCatFormJson}
                placeholder="Descripción"
              />
              <button className="button big yellow">Registrar Categoría</button>
            </form>
          </div>

          <div className="form_container">
            <h1>Registro de Productos</h1>
            {formData.img_url != "" && (
              <img src={formData.img_url} className="product_img" />
            )}
            <form
              action=""
              className="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                createProduct();
              }}
            >
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={updateFormJson}
                required
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                onChange={updateFormJson}
                required
              />
              <input
                type="text"
                name="img_url"
                placeholder="URL de Imagen"
                onChange={updateFormJson}
                required
              />
              <input
                type="number"
                name="precio_unitario"
                placeholder="Precio Unitario"
                onChange={updateFormJson}
                required
              />
              <select
                name="id_categoria"
                onChange={updateFormJson}
                defaultValue={""}
                required
              >
                <option value="" disabled>
                  Categoría
                </option>
                {categorias.map((categoria) => {
                  return (
                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                name="min_stock"
                placeholder="Stock Mínimo"
                onChange={updateFormJson}
                required
              />
              <button className="button big yellow">Registrar Producto</button>
            </form>
          </div>
        </div>
      </>
    );
  }
};
