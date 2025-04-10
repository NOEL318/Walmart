import { useState } from "react";
import { useDispatch } from "react-redux";
import { SignIn, SignOut } from "../hooks/userSlice";

export const Auth = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const dispatch = useDispatch();

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
              dispatch(SignIn({ email, password }));
            }}
          >
            <input type="email" placeholder="Email" required id="email" onChange={(e)=> setemail(e.target.value)} />
            <input
              type="password"
              placeholder="Contraseña"
              required
							id="password"
							onChange={(e)=> setpassword(e.target.value)}
            />
            <button type="submit" className="button big dark full-width">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
