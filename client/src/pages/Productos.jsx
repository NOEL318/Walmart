import { useEffect, useState } from "react";
import {
  get_Categorias,
  create_Category,
  create_Product,
  get_Proveedores,
  get_ProductosProveedor,
} from "../hooks/useProductos";
import { toast } from "react-toastify";

export const Productos = ({ user }) => {
  console.log(user);
  const [formData, setformData] = useState({
    nombre: "",
    descripcion: "",
    img_url: "",
    id_categoria: "",
    precio_unitario: 0,
    min_stock: 0,
    id_proveedor: user.id_proveedor,
  });
  const [proveedores, setproveedores] = useState();
  const [productos, setproductos] = useState();
  const [categoryform, setcategoryform] = useState({
    nombre: "",
    descripcion: "",
  });

  const [categorias, setcategorias] = useState();

  useEffect(() => {
    const getData = async () => {
      var { data } = await get_Categorias();
      var provs = await get_Proveedores();
      if (user) {
        var prods = await get_ProductosProveedor(user.id_proveedor);
        setproductos(prods.data.data);
      }
      setproveedores(provs.data.data);

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
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    } else {
      toast("No se ha registrado", { type: "error" });
    }
  };

  const createProduct = async () => {
    var response = await create_Product(formData);
    if (response.status == 200) {
      toast("Registrado Exitósamente", { type: "success" });
    }
  };
  if (categorias && proveedores && productos) {
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

          <h1>Tus Productos:</h1>
          <table>
            <thead>
              <td>Imagen</td>
              <td>Nombre</td>
              <td>Descripción</td>
              <td>Precio Unitario</td>
              <td>Stock Mínimo</td>
            </thead>
            <tbody>
              {productos.map((producto) => {
                console.log(producto);
                return (
                  <tr>
                    <td>
                      <div className="img">
                        <img src={producto.img_url} alt="" />
                      </div>
                    </td>
                    <td>{producto.nombre}</td>
                    <td className="exwdth">{producto.precio_unitario}</td>
                    <td>{producto.descripcion}</td>
                    <td className="exwdth">{producto.min_stock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
