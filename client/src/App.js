import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Proveedores } from "./pages/Proveedores";
import { Auth } from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginwithoutpassword } from "./hooks/userSlice";
import { User } from "./pages/User";

function App() {
  const dispatch = useDispatch();
  const { isSucces, user, isLoading } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(loginwithoutpassword());
  }, [isSucces]);
  if (isLoading == false)
    return (
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path={"/"} element={<Home user={user} />} />
          <Route path={"/Proveedores"} element={<Proveedores />} />
          <Route path={"/Auth"} element={!user ? <Auth /> : <Home />} />
          <Route path={"/User"} element={!user ? <Auth /> : <User />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
