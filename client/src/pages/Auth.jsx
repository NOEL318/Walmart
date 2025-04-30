import { useState } from "react";
import { useDispatch } from "react-redux";
import { SignIn, SignOut, SignUp } from "../hooks/userSlice";

export const Auth = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const dispatch = useDispatch();

  const [createUserForm, setcreateUserForm] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    email: "",
    contrasena: "",
    rol: "cliente",
  });

  const updateUserForm = (e) => {
    const { name, value } = e.target;
    setcreateUserForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="auth">
        <div className="registro">
          <h1>Inicio de Sesión</h1>
          <form
            action=""
            className="formulario"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("enviando");
              dispatch(SignIn({ email, password }));
            }}
          >
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit" className="button big dark full-width">
              Iniciar Sesión
            </button>
          </form>
          <hr />
          <h1>Crear Cuenta</h1>
          <form
            action=""
            className="formulario"
            onSubmit={async (e) => {
              e.preventDefault();
              dispatch(SignUp(createUserForm));
            }}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={updateUserForm}
            />
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              onChange={updateUserForm}
            />
            <input
              type="email"
              onChange={updateUserForm}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={updateUserForm}
              name="contrasena"
              placeholder="Contraseña"
            />
            <input
              type="text"
              onChange={updateUserForm}
              name="direccion"
              placeholder="Dirección"
            />
            <input
              type="tel"
              onChange={updateUserForm}
              name="telefono"
              placeholder="Teléfono"
            />
            <input
              type="text"
              onChange={updateUserForm}
              name="ciudad"
              placeholder="Ciudad"
            />
            <button type="submit" className="button big dark full-width">
              Crear Usuario
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
