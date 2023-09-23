import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { formconstruction } from "../Constats/Patterns";
import { ThemeContext } from "../Context/ThemeContext";
import { UserContext } from "../Context/UserContext";
import { LoggedinContext } from "../Context/LoggedinContext";

const UserInfoModal = ({ show, user, onHide }) => {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Function to edit users from Context
  const { toggleAdduser, toggleEddituser } = useContext(UserContext);
  // Context for logged-in user information
  const { userInfo, setUserInfo, setLoggedin, Loggedin } =
    useContext(LoggedinContext);
  // Set bas values for formData to fit the API requirements
  const [formData, setFormData] = useState({
    Role: "",
    ID: "",
    ProjectID: "",
    Name: "",
    Email: "",
    Password: "",
  });
  // Initialize the form and field assistance when the modal is shown
  useEffect(() => {
    initilizeForm();
  }, [show]);
  // Initialize varification variables
  const initilizefieldAssist = {
    firstname: false,
    middlename: false,
    lastname: false,
    phone: false,
    email: false,
    password: false,
    image: false,
    imagealt: false,
    state: false,
    country: false,
    city: false,
    street: false,
    houseNumber: false,
    zipCode: false,
    business: false,
    note: false,
    type: false,
  };
  // Define states for form
  const [fieldAssist, setfieldAssist] = useState(initilizefieldAssist);
  const [mUserInfo, setmUserInfo] = useState({
    userid: "",
    firstname: "",
    middlename: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    imagealt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    note: "",
    type: "",
    cardsCreated: [],
  });
  // Function to initialize the form
  function initilizeForm() {
    setfieldAssist(initilizefieldAssist);
    if (user) {
      //If a user is being edited revert to user info
      setmUserInfo(userInfo);
    } else {
      setmUserInfo({
        userid: "",
        firstname: "",
        middlename: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        image: "",
        imagealt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        business: "",
        note: "",
        type: "",
        cardsCreated: [],
      });
    }
  }
  // Handler for editing a user including field validation and activation of fieald validation text fields if found invalid
  const handleEditUser = () => {
    const form = document.getElementById("userInputForm");
    if (form.checkValidity()) {
      let updatedUserInfo = { ...mUserInfo, type: userInfo.type };
      if (mUserInfo.type !== userInfo.type) {
        if (mUserInfo.type === "Admin") {
          if (mUserInfo.note === "Admin")
            updatedUserInfo = { ...mUserInfo, type: "Admin" };
        } else {
          updatedUserInfo = { ...mUserInfo, type: userInfo.type };
        }
      } else {
        updatedUserInfo = { ...mUserInfo, type: userInfo.type };
      }
      toggleEddituser(updatedUserInfo);
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...mUserInfo }));
      if (Loggedin.Usertype !== mUserInfo.type) {
        setLoggedin((prevLoggedin) => ({
          ...prevLoggedin,
          Usertype: updatedUserInfo.type,
        }));
      }
      setfieldAssist(initilizefieldAssist);
      onHide();
    } else {
      const invalidFields = form.querySelectorAll(":invalid");
      const updatedFieldAssist = { ...initilizefieldAssist };
      invalidFields.forEach((field) => {
        updatedFieldAssist[field.id] = true;
      });
      setfieldAssist(updatedFieldAssist);
    }
  };

  // Handler for adding a user including field validation and activation of fieald validation text fields if found invalid
  const handleAddUser = () => {
    const form = document.getElementById("userInputForm");
    if (form.checkValidity()) {
      let updatedUserInfo;
      // For a little security, the way to become an Admin is to write "Admin" in the notes. The API doesn't accept the definition anyway, so it's just for internal user types.
      if (mUserInfo.note === "Admin") {
        updatedUserInfo = { ...mUserInfo, type: "Admin" };
      } else {
        updatedUserInfo = { ...mUserInfo };
      }

      const updateFormData = {
        ...formData,
        ID: updatedUserInfo.email,
        Role: updatedUserInfo.type,
        Name: updatedUserInfo.firstname,
        Email: updatedUserInfo.email,
        Password: updatedUserInfo.password,
      };
      toggleAdduser(updateFormData, updatedUserInfo);
      setfieldAssist(initilizefieldAssist);
      onHide();
    } else {
      const invalidFields = form.querySelectorAll(":invalid");
      const updatedFieldAssist = { ...initilizefieldAssist };

      invalidFields.forEach((field) => {
        updatedFieldAssist[field.id] = true;
      });

      setfieldAssist(updatedFieldAssist);
    }
  };
  // Close the modal and reset form inputs
  const handleclose = () => {
    initilizeForm();
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
          {user ? <h1> Edit User {user}</h1> : <h1> Register</h1>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        <Form
          className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
          id="userInputForm"
        >
          <Row>
            {constructionAssiste(formconstruction.firstname)}
            {constructionAssiste(formconstruction.middlename)}
          </Row>
          <Row>
            {constructionAssiste(formconstruction.lastname)}
            {constructionAssiste(formconstruction.phone)}
          </Row>
          <Row>
            {user ? (
              <>
                {constructionAssiste(formconstruction.email_closed)}
                {constructionAssiste(formconstruction.password_closed)}
              </>
            ) : (
              <>
                {constructionAssiste(formconstruction.email)}
                {constructionAssiste(formconstruction.password)}
              </>
            )}
          </Row>
          <Row>
            {constructionAssiste(formconstruction.image)}
            {constructionAssiste(formconstruction.imagealt)}
          </Row>
          <Row>
            {constructionAssiste(formconstruction.state)}
            {constructionAssiste(formconstruction.country)}
          </Row>
          <Row>
            {constructionAssiste(formconstruction.city)}
            {constructionAssiste(formconstruction.street)}
          </Row>
          <Row>
            {constructionAssiste(formconstruction.houseNumber)}
            {constructionAssiste(formconstruction.zipCode)}
          </Row>
          <Row>
            {user ? (
              <>{constructionAssiste(formconstruction.type_edit)}</>
            ) : (
              <>{constructionAssiste(formconstruction.type)}</>
            )}
            {constructionAssiste(formconstruction.note)}
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

        {user ? (
          <Button variant={themeProps.ModalButtons} onClick={handleEditUser}>
            Edit User
          </Button>
        ) : (
          <Button variant={themeProps.ModalButtons} onClick={handleAddUser}>
            Register
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { UserInfoModal };
