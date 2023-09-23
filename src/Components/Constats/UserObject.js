import { Button, Card } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { UserListContext } from "../Context/UserListContext";
import { AdminUserEditModal } from "../Modals/AdminUserEditModal";

const UserObjectConstruction = ({ user, handleDeleteUser }) => {
  // Context for managing color theme
  const { themeProps, theme, toggleTheme } = useContext(ThemeContext);
  // Context for managing user list
  const { userFilters, setUserFilters, userLoading, filteredUsersList } =
    useContext(UserListContext);
  // State for showing the user edit modal
  const [showAdminUserEditModal, setshowAdminUserEditModal] = useState(false);
  // Function to open the user edit modal
  const openAdminUserEditModal = () => setshowAdminUserEditModal(true);

  return (
    <>
      {/*  User object */}
      <Card
        className="m-1"
        style={{ minHeight: "150px" }}
        bg={themeProps.CardBG}
      >
        <Card.Body className={`${themeProps.CardBG} ${themeProps.CardText} `}>
          <Card.Title>
            <h2>User: {user.Email}</h2>
          </Card.Title>
          <hr />
          <Card.Text>
            <b>Name:</b> {user.Name}
            <br />
            <b>Role:</b> {user.Role}
            <br />
          </Card.Text>
        </Card.Body>
        <Card.Footer
          className={`${themeProps.CardBG} ${themeProps.CardText}footer container-fluid d-flex justify-content-center`}
        >
          <Button
            variant={themeProps.CardBtn}
            onClick={() => handleDeleteUser(user.Email)}
            className="mx-2"
          >
            <i className="bi bi-trash-fill"></i> Delete
          </Button>

          <Button
            variant={themeProps.CardBtn}
            onClick={openAdminUserEditModal}
            className="mx-2"
          >
            <i className="bi bi-pencil-fill"></i> Edit
          </Button>
        </Card.Footer>

        <AdminUserEditModal
          show={showAdminUserEditModal}
          userToEdit={user.Email}
          onHide={() => setshowAdminUserEditModal(false)}
        />
      </Card>
    </>
  );
};
export { UserObjectConstruction };
