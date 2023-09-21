import { Navigate, useNavigate } from "react-router-dom";
import { LoggedinContext } from "../Context/LoggedinContext";
import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function Protection({ children }) {
  const navigate = useNavigate();
  // Context for logged in user information
  const { Loggedin, userInfo, setLoggedin } = useContext(LoggedinContext);
  // State to keep track of whether the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  // Decoding the JWT token to get user information
  const decodedTokenValues = jwt_decode(localStorage.getItem("loggedintoken"));

  useEffect(() => {
    // Check if the logged-in user is an admin with all posible factors to increas security
    if (
      Loggedin.loggedin &&
      Loggedin.Usertype === "Admin" &&
      userInfo.type === "Admin" &&
      userInfo.email === decodedTokenValues.Email
    ) {
      setIsAdmin(true);
    }
  }, []);
  // If user is an admin, the wrapped gives access to components
  if (isAdmin === true) {
    return children;
  }
  // If not an admin, navigate to the home page
  return navigate("/");
}

export { Protection };
