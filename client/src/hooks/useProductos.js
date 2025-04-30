import axios from "axios";
import { url } from "./hooksConfig";
export const get_Categorias = async () => {
  return await axios.get(`${url}/api/obtener_categorias`);
};

export const get_Productos = async () => {
  return await axios.get(`${url}/api/obtener_productos`);
};

export const create_Category = async (data) => {
  return await axios.post(`${url}/api/crear_categoria`, data);
};

export const create_Product = async (data) => {
  return await axios.post(`${url}/api/crear_producto`, data);
};
