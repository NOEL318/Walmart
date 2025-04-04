import { IoClose } from "react-icons/io5";

export const Modal = ({ title, type, close_text, setshowModal, showModal }) => {
  if (showModal)
    return (
      <div className="modal-container">
        <div className="modal">
          <div className={"header " + type}>
            <div className="title">{title}</div>
            <button
              className="close-cross"
              onClick={() => setshowModal(showModal ? false : true)}
            >
              <IoClose />
            </button>
          </div>
          <div className="body"></div>
          <div className="footer">
            <button
              className="button big white"
              onClick={() => setshowModal(showModal ? false : true)}
            >
              {close_text}
            </button>
          </div>
        </div>
      </div>
    );
};
