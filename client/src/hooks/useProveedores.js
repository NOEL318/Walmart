import axios from "axios";
import { url } from "./hooksConfig";

export const New_Proveedor = (datos) => {
  return axios.post(`${url}/api/nuevo_proveedor`, datos);
};

export const crear_Pedido_Proveedor = (datos) => {
  return axios.post(`${url}/api/crear_pedido_proveedor`, datos);
};

export const get_Proveedores = async () => {
  return await axios.get(`${url}/api/obtener_proveedores`);
};

export const get_Pedidos = async () => {
  return await axios.get(`${url}/api/obtener_pedidos`);
};

export const get_Pedidos_Proveedor = async (id_proveedor) => {
  return await axios.post(`${url}/api/obtener_pedidos_proveedor`, {
    id_proveedor,
  });
};

export const get_Pedido = async (id_pedido) => {
  return await axios.post(`${url}/api/obtener_detalles_pedido`, {
    id_pedido,
  });
};

export const actualizar_Pedido = async (data) => {
  return await axios.post(`${url}/api/actualizar_pedido`, data);
};
