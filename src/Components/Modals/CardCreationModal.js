import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContext";
import { LoggedinContext } from "../Context/LoggedinContext";
import { CardsContext } from "../Context/CardContext";
import { cardFromConstruction } from "../Constats/Patterns";
// Define CardDesignModal
const CardDesignModal = ({ show, selected, onHide }) => {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Context for loggedin user information
  const { userInfo } = useContext(LoggedinContext);
  // Context for card list and card management
  const { cardsList, toggleEditCard, toggleAddCard } = useContext(CardsContext);
  //Effects initialization at the load of the modal
  useEffect(() => {
    if (show && Array.isArray(cardsList)) {
      initilizeForm();
    }
  }, [show]);
  // Initialize state for card information
  const [mCardInfo, setMCardInfo] = useState({
    cardID: "",
    title: "",
    subtitle: "",
    description: "",
    web: "",
    phone: "",
    email: "",
    image: "",
    imagealt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    creator: "",
    favoritedBy: [],
  });
  // Initialize of validiation fields
  const initilizefieldAssist = {
    title: false,
    subtitle: false,
    description: false,
    web: false,
    phone: false,
    email: false,
    image: false,
    imagealt: false,
    state: false,
    country: false,
    city: false,
    street: false,
    houseNumber: false,
    zipCode: false,
    creator: false,
    favoritedBy: false,
  };
  // Initialize validiation fields state
  const [fieldAssist, setfieldAssist] = useState(initilizefieldAssist);
  // Function to initialize the form
  function initilizeForm() {
    if (selected) {
      //If a card is being edited revert to card data
      setMCardInfo(selected.Data.data);
    } else {
      setMCardInfo({
        cardID: "",
        title: "",
        subtitle: "",
        description: "",
        web: "",
        phone: "",
        email: "",
        image: "",
        imagealt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zipCode: "",
        creator: "",
        favoritedBy: [],
      });
    }
    setfieldAssist(initilizefieldAssist);
  }
  // Handler for editing a card including field validation and activation of fieald validation text fields if found invalid
  const handleEditCard = () => {
    const form = document.getElementById("CardInputForm");

    if (form.checkValidity()) {
      toggleEditCard(mCardInfo);
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
  // Handler for adding a card including field validation and activation of fieald validation text fields if found invalid
  const handleAddCard = () => {
    const form = document.getElementById("CardInputForm");
    if (form.checkValidity()) {
      const updatedUserInfo = { ...mCardInfo, creator: userInfo.email };
      toggleAddCard(updatedUserInfo);
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

  // Handler for modal close
  const handleclose = () => {
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
            value={mCardInfo[varinfo]}
            pattern={patternset ? patternset.pattern : undefined}
            title={patternset ? patternset.title : undefined}
            readOnly={invalid ? true : false}
            onChange={(e) =>
              setMCardInfo((prevUserlog) => ({
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
          {selected ? <h1> Edit Card </h1> : <h1> Creat New Card</h1>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${themeProps.ModalText} ${themeProps.ModalBG}`}>
        <Form
          className={`${themeProps.ModalText} ${themeProps.ModalBG}`}
          id="CardInputForm"
        >
          <Row>{constructionAssiste(cardFromConstruction.title)}</Row>
          <Row>{constructionAssiste(cardFromConstruction.subtitle)}</Row>
          <Row>{constructionAssiste(cardFromConstruction.description)}</Row>
          <Row> {constructionAssiste(cardFromConstruction.web)}</Row>
          <Row>
            {constructionAssiste(cardFromConstruction.phone)}
            {constructionAssiste(cardFromConstruction.email)}
          </Row>
          <Row>
            {constructionAssiste(cardFromConstruction.image)}

            {constructionAssiste(cardFromConstruction.imagealt)}
          </Row>
          <Row>
            {constructionAssiste(cardFromConstruction.state)}
            {constructionAssiste(cardFromConstruction.country)}
          </Row>
          <Row>
            {constructionAssiste(cardFromConstruction.city)}

            {constructionAssiste(cardFromConstruction.street)}
          </Row>
          <Row>
            {constructionAssiste(cardFromConstruction.houseNumber)}
            {constructionAssiste(cardFromConstruction.zipCode)}
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

        {selected ? (
          <Button variant={themeProps.ModalButtons} onClick={handleEditCard}>
            Edit Card
          </Button>
        ) : (
          <Button variant={themeProps.ModalButtons} onClick={handleAddCard}>
            Create
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { CardDesignModal };
