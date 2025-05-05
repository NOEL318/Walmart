import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Proveedores } from "./pages/Proveedores";
import { Auth } from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { loginwithoutpassword } from "./hooks/userSlice";
import { User } from "./pages/User";
import { Usuarios } from "./pages/Usuarios";
import { Productos } from "./pages/Productos";
import { Producto } from "./pages/Producto";
import { Inmuebles } from "./pages/Inmuebles";
import { Finanzas } from "./pages/Finanzas";
import { ToastContainer } from "react-toastify";
import { Almacenes } from "./pages/Almacenes";
import { Inventario } from "./pages/Inventario";
import { Carrito } from "./pages/Carrito";
import { Pedidos_Proveedores } from "./pages/Pedidos_Proveedores";
import { Pedidos } from "./pages/Pedidos";
import { Pedido } from "./pages/Pedido";

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
          <Route path={"/Carrito"} element={user ? <Carrito /> : <Auth />} />
          <Route
            path={"/Inmuebles"}
            element={user ? <Inmuebles /> : <Auth />}
          />
          {user && (
            <Route
              path={"/Pedidos"}
              element={
                user.rol == "admin" || user.rol == "proveedor" ? (
                  <Pedidos user={user} />
                ) : (
                  <Auth />
                )
              }
            />
          )}
          {user && (
            <Route
              path={"/Pedidos_Proveedores"}
              element={
                user.rol == "empleado" || user.rol == "admin" ? (
                  <Pedidos_Proveedores />
                ) : (
                  <Auth />
                )
              }
            />
          )}
          <Route path={"/Finanzas"} element={user ? <Finanzas /> : <Auth />} />
          {user && (
            <Route
              path={"/Productos"}
              element={
                user.rol != "cliente" ? <Productos user={user} /> : <Auth />
              }
            />
          )}
          <Route
            path={"/Producto/:id_producto"}
            element={user ? <Producto /> : <Auth />}
          />
          <Route
            path={"/Pedido/:id_pedido"}
            element={user ? <Pedido /> : <Auth />}
          />
          <Route path={"/Usuarios"} element={user ? <Usuarios /> : <Auth />} />
          <Route
            path={"/Almacenes"}
            element={user ? <Almacenes /> : <Auth />}
          />
          <Route path={"/Carrito"} element={user ? <Carrito /> : <Auth />} />
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
