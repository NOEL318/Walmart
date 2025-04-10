import { useState } from "react";
import { Modal } from "../components/Modal";

export const Home = ({ user }) => {
  const [showModal, setshowModal] = useState(false);
  const [showModall, setshowModall] = useState(false);

  return (
    <>
      <Modal
        title={"Advertencia"}
        type={"success"}
        close_text={"Cerrar"}
        showModal={showModal}
        setshowModal={setshowModal}
      />

      <div className="home">{JSON.stringify(user)}</div>
    </>
  );
};
