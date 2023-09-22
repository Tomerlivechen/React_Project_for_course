import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContext";
// Define ErrorLoginModal
const ErrorLoginModal = ({ show, onHide }) => {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  return (
    //Modal object construction
    <Modal
      size="sm"
      show={show}
      onHide={onHide}
      dialogClassName={`${themeProps.ModalBG} ${themeProps.ModalBorderStyle}`}
      className="modal-dialog-centered"
    >
      <Modal.Header
        closeButton
        className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
      >
        <Modal.Title
          className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
        >
          Login Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        Login credentials are incorrect
      </Modal.Body>
    </Modal>
  );
};

export { ErrorLoginModal };
