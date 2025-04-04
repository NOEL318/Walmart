import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Proveedores } from "./pages/Proveedores";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Proveedores"} element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
