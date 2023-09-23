import { Button, Card, Col, Row } from "react-bootstrap";
import { CardDesignModal } from "../Modals/CardCreationModal";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { CardsContext } from "../Context/CardContext";
import QRCode from "qrcode.react";

const CardConstruction = ({
  card,
  userInfo,
  Loggedin,
  setchosen,
  handleDeleteCard,
}) => {
  // Context for managing card favorite
  const { toggleFavoriteCard, toggleUnFavoriteCard } = useContext(CardsContext);
  // Context for managing color theme
  const { themeProps, theme, toggleTheme } = useContext(ThemeContext);
  // State for controlling the card edit modal visibility
  const [showCardEditModal, setshowCardEditModal] = useState(false);
  //Function to open the card edit modal.
  const openCardModal = () => setshowCardEditModal(true);
  //Function to limit the length of dysplayed text to no creat shifting in card structur
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <>
      {/*  Card object */}
      <Card
        key={card.cardID}
        className="col-12 m-1 p-0"
        style={{ height: 600 }}
        bg={themeProps.CardBG}
      >
        <Card.Img
          src={card.Data.data.image}
          alt={card.Data.data.imagealt}
          style={{
            height: "auto",
            width: "100%",
          }}
        />
        <Card.Body
          className={`${themeProps.CardBG} ${themeProps.CardText} `}
          onClick={() => setchosen(card)}
        >
          <Card.Title>
            <h2>{truncateText(card.Data.data.title, 13)}</h2>
          </Card.Title>
          <Card.Subtitle>
            <h4>{truncateText(card.Data.data.subtitle, 16)}</h4>
          </Card.Subtitle>
          <hr />

          <Card.Text className="col-12 ">
            <Row>
              <Col className="xs={12} md={12} lg={6} xl={6}">
                <b>Phone :</b> {card.Data.data.phone}
                <br />
                <b>E-mail :</b> {card.Data.data.email}
                <br />
              </Col>
              <Col className="xs={12} md={12} lg={6} xl={6}">
                <div style={{ textAlign: "center" }}>
                  <b>Card ID </b>
                  <br />
                  <QRCode value={card.Data.data.cardID} size={60} />
                </div>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Footer
          onClick={() => setchosen(false)}
          className={`${themeProps.CardBG} ${themeProps.CardText}footer container-fluid d-flex justify-content-center`}
        >
          <div className="row">
            <div className="col-2">
              {userInfo.type === "Admin" ||
              card.Data.data.creator === userInfo.email ? (
                <Button
                  variant={themeProps.CardBtn}
                  onClick={() => handleDeleteCard(card.ItemID)}
                >
                  <i className="bi bi-trash-fill"></i>
                </Button>
              ) : null}
            </div>
            <div className="col-2 pe-5">
              {card.Data.data.creator === userInfo.email ||
              userInfo.type === "Admin" ? (
                <>
                  <Button variant={themeProps.CardBtn} onClick={openCardModal}>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>

                  <CardDesignModal
                    show={showCardEditModal}
                    selected={card}
                    onHide={() => setshowCardEditModal(false)}
                  />
                </>
              ) : null}
            </div>
            <div className="col-2"></div>
            <div className="col-2">
              {/* Managing favorite status with loggedin user*/}
              {card.Data.data.favoritedBy.includes(userInfo.email) ? (
                <Button
                  variant={themeProps.CardBtn}
                  className="end"
                  onClick={() => toggleUnFavoriteCard(card)}
                >
                  <i className="bi bi-heart-fill" style={{ color: "red" }}></i>
                </Button>
              ) : Loggedin.loggedin ? (
                <Button
                  variant={themeProps.CardBtn}
                  className="end"
                  onClick={() => toggleFavoriteCard(card)}
                >
                  <i className="bi bi-heart-fill"></i>
                </Button>
              ) : null}
            </div>
            <div className="col-2">
              <Button
                variant={themeProps.CardBtn}
                className="end"
                onClick={() => window.open(`tel:+${card.Data.data.phone}`)}
              >
                <i className="bi bi-telephone-fill"></i>
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};
export { CardConstruction };
