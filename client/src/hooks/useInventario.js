import axios from "axios";
import { url } from "./hooksConfig";

export const get_Inventario = async (id_almacen) => {
  return await axios.post(`${url}/api/get_inventario`, { id_almacen });
};

export const add_To_Almacen_Inventario = async (producto) => {
  return await axios.post(`${url}/api/add_to_almacen_inventario`, producto);
};
