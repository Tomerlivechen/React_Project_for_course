// Importing the Alert component from react-bootstrap
import { Alert } from "react-bootstrap";
// CSS style for the alerts
const alertStyle = {
  position: "absolute",
  top: "60px",
  right: "10px",
  width: "250px",
};
// Object containing different alert patterns
const AlertPattern = {
  // Alert for when a card is added to favorites
  FavoriteCardAlert: (
    <Alert
      variant="danger"
      style={alertStyle}
    >{`Card added to favorits`}</Alert>
  ),
  // No alert
  none: "",
  // Alert for when a card is successfully created
  CreateCardAlert: (
    <Alert
      variant="success"
      style={alertStyle}
    >{`Card successfully created`}</Alert>
  ),
  // Alert for when a card is removed from favorites
  UnfavoriteCardAlert: (
    <Alert
      variant="secondary"
      style={alertStyle}
    >{`Card removed from favorits `}</Alert>
  ),

  // Alert for when a card is deleted
  DeleteCardAlert: (
    <Alert
      variant="dark"
      style={alertStyle}
    >{`Card deleted successfully`}</Alert>
  ),
  // Alert for when a card is edited
  EditedCardAlert: (
    <Alert
      variant="info"
      style={alertStyle}
    >{`Card edited successfully `}</Alert>
  ),
  // Alert for when a user is deleted
  DeleteUserAlert: (
    <Alert
      variant="dark"
      style={alertStyle}
    >{`User deleted successfully`}</Alert>
  ),
  // Alert for when a user is edited
  EditedUserAlert: (
    <Alert
      variant="warning"
      style={alertStyle}
    >{`User edited successfully `}</Alert>
  ),
};

export { AlertPattern };
