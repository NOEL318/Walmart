import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Proveedores } from "./pages/Proveedores";
import { Auth } from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginwithoutpassword } from "./hooks/userSlice";
import { User } from "./pages/User";
import { Usuarios } from "./pages/Usuarios";
import { Productos } from "./pages/Productos";
import { Inmuebles } from "./pages/Inmuebles";
import { Finanzas } from "./pages/Finanzas";
import { ToastContainer } from "react-toastify";
import { Almacenes } from "./pages/Almacenes";
import { Inventario } from "./pages/Inventario";

function App() {
  const dispatch = useDispatch();
  const { isSucces, user, isLoading } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(loginwithoutpassword());
  }, [isSucces]);
  if (isLoading == false) {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Navbar user={user} />
        <Routes>
          <Route path={"/"} element={user ? <Home user={user} /> : <Auth />} />
          <Route path={"/Auth"} element={!user ? <Auth /> : <Home />} />
          <Route
            path={"/Proveedores"}
            element={user ? <Proveedores /> : <Auth />}
          />
          <Route
            path={"/Inmuebles"}
            element={user ? <Inmuebles /> : <Auth />}
          />
          <Route path={"/Finanzas"} element={user ? <Finanzas /> : <Auth />} />
          <Route
            path={"/Productos"}
            element={user ? <Productos /> : <Auth />}
          />
          <Route path={"/Usuarios"} element={user ? <Usuarios /> : <Auth />} />
          <Route
            path={"/Almacenes"}
            element={user ? <Almacenes /> : <Auth />}
          />
          <Route
            path={"/Inventario/:id_almacen"}
            element={user ? <Inventario /> : <Auth />}
          />
          <Route
            path={"/User"}
            element={!user ? <Auth /> : <User user={user} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
