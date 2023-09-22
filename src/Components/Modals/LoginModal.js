import { useState, useContext } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContext";
import { loginConstruction } from "../Constats/Patterns";
import { LoggedinContext } from "../Context/LoggedinContext";

const LoginModal = ({ show, onHide }) => {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Context for managing logged-in state
  const { LoginUser } = useContext(LoggedinContext);
  // State for defining login form inputs
  const [loggingIn, setloggingIn] = useState({ email: "", password: "" });
  // Handler for closing the modal reset form inputs
  const handleclose = () => {
    setloggingIn({ email: "", password: "" });
    onHide();
  };
  // Handler for logging in
  const handleLoggin = () => {
    // Attempt login using provided credentials and close modal
    LoginUser(loggingIn);
    onHide();
  };
  // Helper function for constructing form elements in the modal
  const constructionAssiste = (args) => {
    const [varinfo, type, text, patternset, invalid, isRequired, sizeM, sizeS] =
      args;
    return (
      <Col xs={sizeS} md={sizeM}>
        <Form.Group className="mb-3">
          <Form.Label>{text}</Form.Label>
          <Form.Control
            id={varinfo}
            type={type}
            value={loggingIn[varinfo]}
            pattern={patternset ? patternset.pattern : undefined}
            title={patternset ? patternset.title : undefined}
            readOnly={invalid ? true : false}
            onChange={(e) =>
              setloggingIn((prevUserlog) => ({
                ...prevUserlog,
                [varinfo]: e.target.value,
              }))
            }
            required={isRequired ? true : false}
          />
        </Form.Group>
      </Col>
    );
  };

  return (
    //Modal object construction
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={`${themeProps.ModalBG} ${themeProps.ModalBorderStyle}`}
      className={`modal-dialog-centered`}
    >
      <Modal.Header closeButton className={`${themeProps.ModalBG}`}>
        <Modal.Title className={themeProps.ModalText}>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        {constructionAssiste(loginConstruction.email)}
        {constructionAssiste(loginConstruction.password)}
      </Modal.Body>
      <Modal.Footer className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        <Button variant={themeProps.ModalButtons} onClick={handleclose}>
          Close
        </Button>
        <Button variant={themeProps.ModalButtons} onClick={handleLoggin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { LoginModal };
