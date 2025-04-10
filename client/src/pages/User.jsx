import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignOut } from "../hooks/userSlice";

export const User = ({ user }) => {
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(SignOut());
	};
	return (
    <>
      <h3>Id_Usuario: </h3>
      <h3>Email: </h3>
      <h3>Contraseña: </h3>
    </>
  );
};
