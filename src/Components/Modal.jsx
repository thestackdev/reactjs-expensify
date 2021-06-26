import { useRef , useEffect } from 'react'
import closeImg from "Images/close.png";

const Modal = (props) => {
  const ref = useRef();

  const handleClickEvents = (event) => {
    if (event.keyCode === 27) props.handleClose();
  };

  const handleMouseEvents = (event) => {
    if (event.target === ref.current) props.handleClose();
  };

  useEffect(() => {
    if (props.visible) {
      window.addEventListener("keydown", handleClickEvents);
      window.addEventListener("mousedown", handleMouseEvents);
    }

    return () => {
      if (props.visible) {
        window.removeEventListener("keydown", handleClickEvents);
        window.removeEventListener("mousedown", handleMouseEvents);
      }
    };
  }, [props.visible]);

  return (
    <div
      ref={ref}
      className={`modal-backdrop ${props.visible && "modal-backdrop-active"}`}
    >
      <div className="modal-container">
        <img src={closeImg} alt="Close" onClick={() => props.handleClose()} />
        {props.children}
      </div>
    </div>
  );
};

export default Modal
