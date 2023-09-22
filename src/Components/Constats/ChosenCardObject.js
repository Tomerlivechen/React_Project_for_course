import { Button, Card, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { CardsContext } from "../Context/CardContext";
import QRCode from "qrcode.react";

const ChosenCardObject = ({ chosen, setchosen }) => {
  // Context for managing card list
  const { loading, cardsList } = useContext(CardsContext);
  // Context for managing color theme
  const { themeProps, theme, toggleTheme } = useContext(ThemeContext);
  // Function to handle moving to the previous card
  const handlePrev = () => {
    const currentIndex = cardsList.findIndex(
      (card) => card.ItemID === chosen.ItemID
    );
    if (currentIndex > 0) {
      setchosen(cardsList[currentIndex - 1]);
    }
  };

  // Function to handle moving to the next card
  const handleNext = () => {
    const currentIndex = cardsList.findIndex(
      (card) => card.ItemID === chosen.ItemID
    );
    if (currentIndex < cardsList.length - 1) {
      setchosen(cardsList[currentIndex + 1]);
    }
  };
  // Function to open Google Maps with the chosen card's address
  const handleOpenMap = () => {
    const encodedAddress = encodeURIComponent(
      `${chosen.Data.data.houseNumber} ${chosen.Data.data.street} ${chosen.Data.data.city} ${chosen.Data.data.state} ${chosen.Data.data.country} ${chosen.Data.data.zipCode}`
    );
    const googleMapsLink = `https://www.google.com/maps/place/
   ${encodedAddress}`;
    window.open(googleMapsLink, "_blank");
  };

  return (
    <>
      {/* Main container for the chosen card */}
      <div className={themeProps.ModalBG} style={{ height: "100vh" }}>
        <div className="container">
          {/* Chosen card object */}
          <Card
            bg={themeProps.NavbarMain}
            style={{ fontSize: "20px" }}
            border={`${themeProps.ModalBorderStyle}`}
          >
            <Card.Img
              src={chosen.Data.data.image}
              alt={chosen.Data.data.imagealt}
              style={{ height: "20vh", width: "100%", objectFit: "cover" }}
            />
            <Card.Body className={themeProps.CardBG}>
              <Card.Title className="text-center">
                <h2>{chosen.Data.data.title}</h2>
              </Card.Title>
              <Card.Subtitle className="text-center">
                <h4>{chosen.Data.data.subtitle}</h4>
              </Card.Subtitle>
              <hr />
              <Card.Text className="row">
                <div className="col-12 m-3">{chosen.Data.data.description}</div>
                <div className="row">
                  <div className="col-3 m-2 ">
                    <b>Phone :</b> {chosen.Data.data.phone}
                    <br />
                    {chosen.state ? (
                      <span>
                        <b>State :</b> {chosen.Data.data.state}
                      </span>
                    ) : (
                      <span>
                        <b>Country :</b> {chosen.Data.data.country}
                      </span>
                    )}
                    <br />
                    <b>House Number</b> {chosen.Data.data.houseNumber}
                  </div>
                  <div className="col-4 m-2">
                    <b>E-mail :</b> {chosen.Data.data.email}
                    <br />
                    <b>City:</b> {chosen.Data.data.city}
                    <br />
                    <b>Zip Code</b> {chosen.Data.data.zipCode}
                  </div>
                  <div className="col-4 m-2">
                    <b>Web Page :</b> {chosen.Data.data.web}
                    <br />
                    <b>Street :</b> {chosen.Data.data.street}
                    <br />
                  </div>
                </div>
                <Row>
                  <Col
                    className="col-12 m-2 justify-content-center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <b>Card ID </b>
                    <QRCode value={chosen.Data.data.cardID} size={60} />
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="footer">
              <div className="  justify-content-center align-items-center d-flex">
                <div className="row ">
                  <div className="col-1 ps-5"></div>
                  <div className="col">
                    <Button
                      variant={themeProps.CardBtn}
                      className="end m-2"
                      onClick={() =>
                        window.open(`tel:+${chosen.Data.data.phone}`)
                      }
                    >
                      <i
                        className="bi bi-telephone-fill"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                    <Button
                      variant={themeProps.CardBtn}
                      className="end m-2"
                      onClick={() =>
                        window.open(`mailto:${chosen.Data.data.email}`)
                      }
                    >
                      <i
                        className="bi bi-envelope-fill"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                    <Button
                      variant={themeProps.CardBtn}
                      className="end m-2"
                      onClick={() => window.open(chosen.Data.data.web)}
                    >
                      <i
                        className="bi bi-browser-chrome"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                    <Button
                      variant={themeProps.CardBtn}
                      className="end m-2"
                      onClick={handleOpenMap}
                    >
                      <i
                        className="bi bi-pin-map-fill"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-2">
                  {cardsList.findIndex(
                    (pics) => pics.ItemID === chosen.ItemID
                  ) > 0 ? (
                    <Button variant={themeProps.CardBtn} onClick={handlePrev}>
                      <i
                        className="bi bi-arrow-left-square-fill"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                  ) : null}
                </div>
                <div className="col-4"></div>
                <div className="col-2">
                  <Button
                    variant={themeProps.CardBtn}
                    onClick={() => setchosen("")}
                  >
                    <i
                      className="bi bi-arrow-bar-down"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </Button>
                </div>
                <div className="col-3"></div>
                <div className="col-1">
                  {cardsList.findIndex(
                    (pics) => pics.ItemID === chosen.ItemID
                  ) <
                  cardsList.length - 1 ? (
                    <Button variant={themeProps.CardBtn} onClick={handleNext}>
                      <i
                        className="bi bi-arrow-right-square-fill"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
};
export { ChosenCardObject };
