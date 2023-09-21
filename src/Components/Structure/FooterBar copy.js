import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useEffect, useState } from "react";
import { useContext } from "react";

import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { LoggedinContext } from "../Context/LoggedinContext";
import { CardDesignModal } from "../Modals/CardCreationModal";
import { CardsContext } from "../Context/CardContext";

function FooterBar() {
  const { setFilters } = useContext(CardsContext);
  const { themeProps, theme, toggleTheme } = useContext(ThemeContext);
  const { Loggedin, userInfo, setLoggedin } = useContext(LoggedinContext);

  const [showCardModal, setshowCardModal] = useState(false);
  const openCardModal = () => setshowCardModal(true);
  const navigate = useNavigate();

  const handleFaveCards = () => {
    setFilters("FAV");
    navigate("/");
  };

  const handleMyCards = () => {
    setFilters("MY");
    navigate("/");
  };

  return (
    <>
      <footer
        className={`footer ${themeProps.FooterBarMain} text-center text-lg-start fixed-bottom border-top border-black mt-4 `}
      >
        <div
          className={`container-fluid  m-3 ${
            !Loggedin.loggedin ? "d-flex justify-content-center" : ""
          } `}
        >
          <div className="row">
            {Loggedin.Usertype === "User" ? (
              <>
                <div className="col-4"></div>
              </>
            ) : (
              <></>
            )}

            <div className="col-3">
              <Button
                variant={themeProps.NavBarButtons}
                onClick={() => navigate("about")}
              >
                <i
                  className="bi bi-info-circle-fill"
                  style={{ fontSize: "24px" }}
                ></i>
                <br />
                About
              </Button>
            </div>
            {Loggedin.loggedin ? (
              <>
                <div className="col-3">
                  <Button
                    variant={themeProps.NavBarButtons}
                    onClick={handleFaveCards}
                  >
                    <i
                      className="bi bi-heart-fill"
                      style={{ fontSize: "24px" }}
                    ></i>
                    <br />
                    Favorits
                  </Button>
                </div>
                {Loggedin.Usertype === "Admin" ||
                Loggedin.Usertype === "Business" ? (
                  <>
                    <div className="col-3">
                      <Button
                        variant={themeProps.NavBarButtons}
                        onClick={handleMyCards}
                      >
                        <i
                          className="bi bi-file-person"
                          style={{ fontSize: "24px" }}
                        ></i>
                        <br />
                        My Cards
                      </Button>
                    </div>
                    <div className="col-3">
                      <Button
                        variant={themeProps.NavBarButtons}
                        onClick={openCardModal}
                      >
                        <i
                          className="bi bi-file-plus-fill"
                          style={{ fontSize: "24px" }}
                        ></i>
                        <br />
                        Creat Cards
                      </Button>
                      <CardDesignModal
                        show={showCardModal}
                        selected={false}
                        onHide={() => setshowCardModal(false)}
                      />
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </footer>
    </>
  );
}
export { FooterBar };
