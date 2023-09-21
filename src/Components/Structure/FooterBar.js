import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import { useContext } from "react";

import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { LoggedinContext } from "../Context/LoggedinContext";
import { CardDesignModal } from "../Modals/CardCreationModal";
import { CardsContext } from "../Context/CardContext";
// Defining the FooterBar component
function FooterBar() {
  // filter form context to use for filtering cards
  const { setFilters } = useContext(CardsContext);
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Using loggedin to assess users' permissions on the app.
  const { Loggedin } = useContext(LoggedinContext);
  //State to activate show card creation modal
  const [showCardModal, setshowCardModal] = useState(false);
  // Function to open the card creation modal
  const openCardModal = () => setshowCardModal(true);
  // Using the useNavigate hook to navigate programmatically
  const navigate = useNavigate();
  // Function to handle filtering for favorite cards
  const handleFaveCards = () => {
    setFilters("FAV");
    navigate("/");
  };
  // Function to handle filtering and navigation for user's own cards
  const handleMyCards = () => {
    setFilters("MY");
    navigate("/");
  };

  return (
    //Footer construction
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
              // Conditionally rendering architecture based on user type
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
              // Conditionally rendering content based on logged-in status
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
                  // Conditionally rendering content based on user type
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
