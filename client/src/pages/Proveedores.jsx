import { useState } from "react";
import { New_Proveedor } from "../hooks/useProveedores";

export const Proveedores = () => {
  const [nombre, setnombre] = useState();
  const [direccion, setdireccion] = useState();
  const [telefono, settelefono] = useState();
  const [email, setemail] = useState();

  return (
    <div className="proveedores">
      <div className="registro">
        <h1>Registro de Proveedores</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await New_Proveedor({ nombre, direccion, telefono, email });
          }}
          className="formulario"
        >
          <input
            type="text"
            placeholder="Nombre"
            required
            onChange={(e) => setnombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dirección"
            required
            onChange={(e) => setdireccion(e.target.value)}
          />
          <input
            type="phone"
            placeholder="Teléfono"
            required
            onChange={(e) => settelefono(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setemail(e.target.value)}
          />
          <button type="submit" className="button big yellow">
            Registrar Proveedor
          </button>
        </form>
      </div>
    </div>
  );
};
