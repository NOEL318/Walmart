import mainlogo from "../assets/mainlogoo.svg";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { PiSquaresFour } from "react-icons/pi";
import { PiCirclesFour } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Navbar = ({ user }) => {
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
            <Link to={"/Auth"}>
              <div className="logo">
                <FiUser />
              </div>
              {!user && (
                <div className="text">
                  <div className="left">Iniciar sesión</div>
                  <div className="right">Cuenta</div>
                </div>
              )}
            </Link>
            <Link to={"/User"}>
              {user && (
                <div className="text">
                  <div className="left">{user.nombre}</div>
                  <div className="right">Cuenta</div>
                </div>
              )}
            </Link>
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
