import { useContext, useEffect, useState } from "react";
import { LoggedinContext } from "../Context/LoggedinContext";
import { ThemeContext } from "../Context/ThemeContext";
import { CardsContext } from "../Context/CardContext";
import { CardConstruction } from "../Constats/CardObject";
import Spinner from "react-bootstrap/Spinner";
import { Col, Row, Container } from "react-bootstrap";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { ChosenCardObject } from "../Constats/ChosenCardObject";
import { filterPatterns } from "../Constats/Patterns";
import { AlertContext } from "../Context/AlertContext";
import { AlertPattern } from "../Constats/AlertsConstant";
import { ErrorLoginModal } from "../Modals/ErrorLoginModal";
// Defining the MainPage component
function MainPage() {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Using loggedin to assess users' permissions on the app.
  const { Loggedin, userInfo, showErrorLoginModal, setShowErrorLoginModal } =
    useContext(LoggedinContext);
  // Context for card list and card management
  const { loading, filters, cardsList, toggleDeleteCard } =
    useContext(CardsContext);
  // Context for alert management
  const { AlertType } = useContext(AlertContext);
  //State to triger changing of card view
  const [chosen, setchosen] = useState(false);
  // States to manage delete confermation modal
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const [cardToDeleteItemID, setcardToDeleteItemID] = useState(false);
  // States for page titles and subtitles for searching and filter options
  const [titleText, setTitleText] = useState("");
  // Function to handle deletion of a card
  const handleDeleteCard = (cardItemID) => {
    setcardToDeleteItemID(cardItemID);
    setshowConfirmModal(true);
  };

  // Function to handle confirmed card deletion
  const handleDeleteConfirmed = () => {
    toggleDeleteCard(cardToDeleteItemID);
  };
  // UseEffect to update the titleText based on the selected filter and thus the title and subtitle of the page

  useEffect(() => {
    switch (filters) {
      case "MY":
        return setTitleText(filterPatterns[1]);
      case "FAV":
        return setTitleText(filterPatterns[2]);
      case "":
        return setTitleText(filterPatterns[0]);
      default:
        return setTitleText(filterPatterns[3]);
    }
  }, [filters]);
  // Conditional rendering based on loading state becase the API respons is slow and react reacts fast
  if (loading) {
    return (
      <>
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={themeProps.ModalBG}
        >
          <Spinner animation="border" variant="info" size="" />
        </div>
      </>
    );
  } else if (chosen) {
    // If a card is chosen the display will change
    return (
      <>
        <ChosenCardObject chosen={chosen} setchosen={setchosen} />
      </>
    );
  } else if (!chosen) {
    //If a card is not chosen and cards are rendered all the cards are visible
    return (
      <>
        {/* Rendering a space for the Navbar */}
        <div style={{ height: "7vh" }} className={themeProps.ModalBG}></div>
        {/* Rendering custom alerts */}
        {AlertPattern[AlertType]}
        {/* Creation of the cardlyst dysplay */}
        <div className={themeProps.ModalBG}>
          <div className="row">
            <div className="col-12">
              <h1 className={themeProps.ModalText}> {titleText.title}</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <h3 className={themeProps.ModalText}>{titleText.subtitle}</h3>
              </div>
            </div>
          </div>
          <Container
            className={`mt-4 container-fluid h-100 ${themeProps.ModalBG}`}
          >
            <Row>
              {/* Rendering the cards */}
              {cardsList.map((card) => (
                <Col
                  key={card.cardID}
                  className="xs={12} md={4} lg={4} xl={4} m-1 p-0"
                  style={{
                    height: 600,
                    maxWidth: "300px",
                    minWidth: "250px",
                    margin: "0 auto",
                  }}
                  bg={themeProps.ModalBG}
                >
                  <CardConstruction
                    card={card}
                    userInfo={userInfo}
                    Loggedin={Loggedin}
                    setchosen={setchosen}
                    handleDeleteCard={handleDeleteCard}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        {/* Rendering the ConfirmModal for card deletion */}
        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setshowConfirmModal(false)}
          confirm={handleDeleteConfirmed}
          object="card"
        />
        {/* Rendering the ErrorLoginModal for login Error*/}
        <ErrorLoginModal
          show={showErrorLoginModal}
          onHide={() => setShowErrorLoginModal(false)}
        />
        {/* Rendering a space for the Footer */}
        {cardsList.length ? (
          <div style={{ height: "15vh" }} className={themeProps.ModalBG}></div>
        ) : (
          <>
            {/* Rendering a space no cards or an empty search */}
            <div style={{ height: "100vh" }} className={themeProps.ModalBG}>
              <h3 className={themeProps.ModalText}>
                Ain't Nobody here, but us chickens...
                <i className="fa-solid fa-crow"></i>
              </h3>
            </div>
          </>
        )}
      </>
    );
  }
}

export { MainPage };
