import mainlogo from "../assets/mainlogo.svg";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { PiSquaresFour } from "react-icons/pi";
import { PiCirclesFour } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to={"/"}>
            <img src={mainlogo} alt="" />
          </Link>
        </li>
        <li>
          <div className="navbar_option">
            <div className="logo">
              <FiUser />
            </div>
            <div className="text">
              <div className="left">¿Que quieres </div>
              <div className="right">comprar hoy?</div>
            </div>
          </div>
        </li>
        <li>
          <div className="navbar_option">
            <div className="logo">
              <PiSquaresFour />
            </div>
            <div className="text">
              <div>Departamentos</div>
            </div>
          </div>
        </li>
        <li>
          <div className="navbar_option dropdown">
            <div className="logo">
              <PiCirclesFour />
            </div>
            <div className="text">
              <div>Administrador</div>
            </div>
            <ul className="dropdown-option">
              <li>
                <Link to={"/Proveedores"}>Proveedores</Link>
              </li>
              <li>Inventario</li>
              <li>Tiendas</li>
              <li>Almacenes</li>
              <li>Ventas</li>
              <li>Detalles de Venta</li>
              <li>Devoluciones Clientes</li>
              <li>Tarjetas de Fidelización</li>
              <li>Empleados</li>
              <li>Pedidos a Proveedores</li>
              <li>Detalles de Pedido</li>
              <li>Envíoos</li>
              <li>Facturas</li>
              <li>Pagos</li>
              <li>Mantenimiento</li>
              <li>Usuarios del Sistema</li>
            </ul>
          </div>
        </li>
        <li>
          <div className="search_bar">
            <input type="text" placeholder="Buscar en Walmart" />
            <div className="icon">
              <CiSearch />
            </div>
          </div>
        </li>
        <li>
          <div className="navbar_option">
            <div className="logo">
              <FiUser />
            </div>
            <div className="text">
              <div className="left">Iniciar sesión</div>
              <div className="right">Cuenta</div>
            </div>
          </div>
        </li>
        <li>
          <div className="navbar_option cart">
            <div className="logo">
              <PiShoppingCart />
            </div>
            <div className="text">
              <div className="left">$0.00</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
