import axios from "axios";
import { url } from "./hooksConfig";

export const New_Proveedor = (datos) => {
  return axios.post(`${url}/api/nuevo_proveedor`, datos);
};
