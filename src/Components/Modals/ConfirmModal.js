import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContext";
// Define ConfirmModal
const ConfirmModal = ({ show, onHide, confirm, object }) => {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Handler for closing the modal
  const handleclose = () => {
    onHide();
  };
  // Handler for confirming the delete
  const handleConfirm = () => {
    confirm();
    onHide();
  };

  return (
    //Modal object construction
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={`${themeProps.ModalBG} ${themeProps.ModalBorderStyle}`}
      className="modal-dialog-centered"
    >
      <Modal.Header closeButton className={themeProps.ModalBG}>
        <Modal.Title className={themeProps.ModalText}>Delete Card</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
        style={{ fontSize: "24px" }}
      >
        {/*adding an object enables my to use this for all delete confirmations*/}
        Are you sure you want to delete this {object}?
      </Modal.Body>
      <Modal.Footer className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        <Button variant="danger" onClick={handleConfirm}>
          Yes
        </Button>
        <Button variant="secondary" onClick={handleclose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmModal };
