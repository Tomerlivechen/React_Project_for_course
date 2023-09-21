import { Button, Card } from "react-bootstrap";
import { CardDesignModal } from "../Modals/CardCreationModal";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { CardsContext } from "../Context/CardContext";

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
  return (
    <>
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
            height: "40%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Card.Body
          className={`${themeProps.CardBG} ${themeProps.CardText} `}
          onClick={() => setchosen(card)}
        >
          <Card.Title>
            <h2>{card.Data.data.title}</h2>
          </Card.Title>
          <Card.Subtitle>
            <h4>{card.Data.data.subtitle}</h4>
          </Card.Subtitle>
          <hr />
          <Card.Text className="col-12 m-4 pt-3">
            <b>Phone :</b> {card.Data.data.phone}
            <br />
            <b>E-mail :</b> {card.Data.data.email}
            <br />
            <b>Card number</b> {card.Data.data.cardID}
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
                    selected={card.ItemID}
                    onHide={() => setshowCardEditModal(false)}
                  />
                </>
              ) : null}
            </div>
            <div className="col-2"></div>
            <div className="col-2">
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
