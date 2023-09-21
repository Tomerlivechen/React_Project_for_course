import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { AdminUseronstruction } from "../Constats/Patterns";
import { ThemeContext } from "../Context/ThemeContext";
import { UserListContext } from "../Context/UserListContext";
// Define AdminUserEditModal
const AdminUserEditModal = ({ show, userToEdit, onHide }) => {
  // Function to edit users from Context
  const { toggleEditUser, filteredUsersList } = useContext(UserListContext);
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Retrieve the user to be edited
  const editedUser = filteredUsersList.find(
    (user) => user.Email === userToEdit
  );

  // Define states for form
  const initilizefieldAssist = {
    Role: false,
    Name: false,
    Email: false,
    Password: false,
  };

  const [fieldAssist, setfieldAssist] = useState(initilizefieldAssist);
  const [mUserInfo, setmUserInfo] = useState({
    Role: "",
    Name: "",
    Email: "",
    Password: "",
  });
  // Handler for editing a user including field validation and activation of fieald validation text fields if found invalid
  const handleEditUser = () => {
    const form = document.getElementById("AdmimnUserEditForm");

    if (form.checkValidity()) {
      toggleEditUser(mUserInfo);
      setfieldAssist(initilizefieldAssist);
    } else {
      const invalidFields = form.querySelectorAll(":invalid");
      const updatedFieldAssist = { ...initilizefieldAssist };
      invalidFields.forEach((field) => {
        updatedFieldAssist[field.id] = true;
      });
      setfieldAssist(updatedFieldAssist);
    }
  };
  // Handler for  closeing modal
  const handleclose = () => {
    initilizeForm();
    onHide();
  };

  // ReInitialize all variables on start
  useEffect(() => {
    initilizeForm();
  }, [show]);
  function initilizeForm() {
    setfieldAssist(initilizefieldAssist);
    setmUserInfo(editedUser);
  }
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
            value={mUserInfo[varinfo]}
            pattern={patternset ? patternset.pattern : undefined}
            title={patternset ? patternset.title : undefined}
            readOnly={invalid ? true : false}
            onChange={(e) =>
              setmUserInfo((prevUserlog) => ({
                ...prevUserlog,
                [varinfo]: e.target.value,
              }))
            }
            required={isRequired ? true : false}
          />
          {/*vaification text fieald */}
          <Form.Label
            htmlFor={varinfo}
            style={{
              display: fieldAssist[varinfo] ? "block" : "none",
              color: "#FF0000",
            }}
          >
            {patternset ? patternset.title : undefined}
          </Form.Label>
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
    >
      <Modal.Header closeButton className={themeProps.ModalBG}>
        <Modal.Title className={themeProps.ModalText}>
          <h1> Edit User {editedUser.Email}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        <Form
          className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
          id="AdmimnUserEditForm"
        >
          <Row>
            {constructionAssiste(AdminUseronstruction.Name)}
            {constructionAssiste(AdminUseronstruction.Email)}
          </Row>
          <Row>
            {constructionAssiste(AdminUseronstruction.Password)}
            {constructionAssiste(AdminUseronstruction.Role)}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className={themeProps.ModalBG}>
        <Button variant={themeProps.ModalButtons} onClick={initilizeForm}>
          <i className="bi bi-arrow-repeat"></i>
        </Button>
        <Button variant={themeProps.ModalButtons} onClick={handleclose}>
          Close
        </Button>
        <Button variant={themeProps.ModalButtons} onClick={handleEditUser}>
          Edit User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { AdminUserEditModal };
