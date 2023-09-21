import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { useState } from "react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { UserInfoModal } from "../Modals/UserInfoModal";
import { LoginModal } from "../Modals/LoginModal";
import { LoggedinContext } from "../Context/LoggedinContext";
import { Image } from "react-bootstrap";
import { CardsContext } from "../Context/CardContext";
// Defining the NavBar component
function NavBar() {
  // Accessing context values and functions
  const { getStoredCardsList, setFilters } = useContext(CardsContext);
  // Context for managing color theme
  const { themeProps, toggleTheme } = useContext(ThemeContext);
  const { Loggedin, userInfo, setUserInfo, setLoggedin } =
    useContext(LoggedinContext);
  const navigate = useNavigate();
  // States for search function
  const [searchTurm, setSearchTurm] = useState("");
  // States for controlling modal visibility
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Functions for controlling modal visibility
  const openUserModal = () => setShowUserModal(true);
  const openLoginModal = () => setShowLoginModal(true);

  // Function to handle user logout
  const HandleLogOut = () => {
    setUserInfo(false);
    setLoggedin(false);
    localStorage.removeItem("loggedintoken");
    getStoredCardsList();
    setFilters("");
    navigate("/");
  };
  // Function to handle search
  const handleSearch = () => {
    setFilters(searchTurm);
  };
  // Function to handle logo click
  const handlelogoClick = () => {
    setFilters("");
    navigate("/");
  };
  // Function to filter favorite cards
  const handleFaveCards = () => {
    setFilters("FAV");
    navigate("/");
  };
  // Function to filter user's own cards
  const handleMyCards = () => {
    setFilters("MY");
    navigate("/");
  };
  return (
    <>
      <Navbar
        bg={`${themeProps.NavbarMain} border border-black`}
        data-bs-theme={themeProps.NavbarMain}
        className="fixed-top"
      >
        <Container>
          <Col className=" col-1 me-5">
            <Navbar.Brand onClick={handlelogoClick}>
              <Image
                src={themeProps.Logo}
                alt="Logo"
                style={{ width: "150px", height: "40px" }}
              />
            </Navbar.Brand>
          </Col>
          <Nav className="me-auto ms-5">
            <Nav.Link onClick={() => navigate("about")}>Abuot</Nav.Link>
            {Loggedin.Usertype === "user" ||
            Loggedin.Usertype === "Business" ||
            Loggedin.Usertype === "Admin" ? (
              // Conditionally rendering content based on user type
              <Nav.Link onClick={handleFaveCards}>Fav Cards</Nav.Link>
            ) : (
              <></>
            )}
            {Loggedin.Usertype === "Business" ||
            Loggedin.Usertype === "Admin" ? (
              <Nav.Link onClick={handleMyCards}>My Cards</Nav.Link>
            ) : (
              <></>
            )}
            {Loggedin.Usertype === "Admin" ? (
              <Nav.Link onClick={() => navigate("/sandbox")}>Sandbox</Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            <Form inline>
              <Form className="d-flex">
                <Form.Control
                  id="searchBar"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchTurm(e.target.value)}
                  value={searchTurm}
                />
                <Button
                  variant={themeProps.NavBarButtons}
                  onClick={handleSearch}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </Form>
            </Form>
            <Col className=" col-1"></Col>
            <Button
              variant={themeProps.NavBarButtons}
              onClick={() => toggleTheme()}
            >
              <i className={themeProps.ThemeIcon}></i>
            </Button>
            <Col className=" col-1"></Col>
            <Col xs="auto">
              {Loggedin.loggedin === true ? (
                // Conditionally rendering content based on logged-in status
                <>
                  <Image
                    src={userInfo.image}
                    alt={userInfo.imagealt}
                    onClick={openUserModal}
                    roundedCircle={true}
                    style={{ width: "40px", height: "40px" }}
                  />

                  <UserInfoModal
                    show={showUserModal}
                    user={true}
                    onHide={() => setShowUserModal(false)}
                  />
                  <Button
                    variant={themeProps.NavBarButtons}
                    onClick={HandleLogOut}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={themeProps.NavBarButtons}
                    onClick={openUserModal}
                  >
                    Sign up
                  </Button>
                  <UserInfoModal
                    show={showUserModal}
                    user={false}
                    onHide={() => setShowUserModal(false)}
                  />
                  {""}
                  <Button
                    variant={themeProps.NavBarButtons}
                    onClick={openLoginModal}
                  >
                    Login
                  </Button>
                  <LoginModal
                    show={showLoginModal}
                    onHide={() => setShowLoginModal(false)}
                  />
                </>
              )}
            </Col>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export { NavBar };
