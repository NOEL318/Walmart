import axios from "axios";
import { url } from "./hooksConfig";

export const create_Almacen = async (data) => {
  return await axios.post(`${url}/api/crear_almacen`, data);
};

export const get_Almacen = async (id_almacen) => {
  var result = (await axios.post(`${url}/api/get_almacen`, { id_almacen }))
    .data;
  console.log(result, "RESLSSASA");
  return result;
};
export const get_Almacenes = async () => {
  return await axios.get(`${url}/api/obtener_almacenes`);
};

export const create_Tienda = async (data) => {
  return await axios.post(`${url}/api/crear_tienda`, data);
};
