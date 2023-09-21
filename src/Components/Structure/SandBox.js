import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Spinner from "react-bootstrap/Spinner";
import { Col, Row, Container } from "react-bootstrap";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { AlertContext } from "../Context/AlertContext";
import { AlertPattern } from "../Constats/AlertsConstant";
import { UserListContext } from "../Context/UserListContext";
import { UserObjectConstruction } from "../Constats/UserObject";
// Defining the Sandbox component
function Sandbox() {
  // Context for managing color theme
  const { themeProps } = useContext(ThemeContext);
  // Accessing user related context and functions
  const { toggleDeleteUser, userLoading, filteredUsersList } =
    useContext(UserListContext);
  // Accessing alert related context
  const { AlertType } = useContext(AlertContext);
  //States for managing visibilety of confirm modal and user to delete
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const [userToDeleteEmail, setuserToDeleteEmail] = useState(false);
  // Function to initiate user deletion
  const handleDeleteUser = (userEmail) => {
    setuserToDeleteEmail(userEmail);
    setshowConfirmModal(true);
  };
  // Function to handle confirmed user deletion
  const handleDeleteConfirmed = () => {
    toggleDeleteUser(userToDeleteEmail);
  };

  if (userLoading) {
    // Display a spinner while user data is loading
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
  } else {
    // Once user data is loaded, render the users
    return (
      <>
        <div className={themeProps.ModalBG}>
          <div style={{ height: "7vh" }} className={themeProps.ModalBG}>
            {AlertPattern[AlertType]}
          </div>
          <Container
            className={`mt-4 container-fluid h-100 ${themeProps.ModalBG}`}
          >
            <Row>
              {filteredUsersList.map((user) => (
                <Col
                  key={user.Email}
                  className="xs={12} md={4} lg={4} xl={4} m-1 p-0"
                  style={{
                    maxWidth: "300px",
                    minWidth: "250px",
                    margin: "0 auto",
                  }}
                  bg={themeProps.ModalBG}
                >
                  {/* Render individual user components */}
                  <UserObjectConstruction
                    user={user}
                    handleDeleteUser={handleDeleteUser}
                  />
                </Col>
              ))}
            </Row>
            <Col className=" flex">
              <span className={themeProps.CardText}>
                Note: As of September 21, 2023, admin users can only be created
                via the https://crudconnect.com/ site. Therefore, all users
                created via the app will be guests, even though the app itself
                has authentication systems of its own
              </span>
            </Col>
          </Container>
        </div>
        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setshowConfirmModal(false)}
          confirm={handleDeleteConfirmed}
          object="user"
        />
        {filteredUsersList.length ? (
          <div style={{ height: "50vh" }} className={themeProps.ModalBG}></div>
        ) : (
          <>
            {/* Display a full colored screen if there are no users */}
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
        )}
      </>
    );
  }
}

export { Sandbox };
