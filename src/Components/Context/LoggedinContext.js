import { createContext, useState, useEffect } from "react";
import {
  ProjectID,
  registerUser,
  updateUser,
  loginUser,
  postItem,
  getItems,
} from "../Constats/APICommands";
import jwt_decode from "jwt-decode";
import { ErrorLoginModal } from "../Modals/ErrorLoginModal";
// Create a context
const LoggedinContext = createContext();
// Define LoggedinProvider
function LoggedinProvider({ children }) {
  // States to manage error login modal visibility, user info, and loggedin status
  const [showErrorLoginModal, setShowErrorLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [Loggedin, setLoggedin] = useState(false);

  // Function to handle user login
  const LoginUser = async (loggingIn) => {
    try {
      const token = await loginUser(loggingIn.email, loggingIn.password);

      localStorage.setItem("loggedintoken", token.token);
    } catch (error) {
      console.error("Failed to login user:", error);
    } finally {
      try {
        const decodedTokenValues = jwt_decode(
          localStorage.getItem("loggedintoken")
        );
        const gottenUserInfo = await getItems(decodedTokenValues.Email);

        const itemWithHighestDate = gottenUserInfo.reduce((prev, current) => {
          return prev.Date > current.Date ? prev : current;
        });

        let decupledUserInfo = itemWithHighestDate.Data.data;

        decupledUserInfo = {
          ...decupledUserInfo,
          userid: itemWithHighestDate.ItemID,
        };
        setUserInfo(decupledUserInfo);

        alert(
          `Welcome back ${decupledUserInfo.firstname} ${decupledUserInfo.lastname} `
        );
        setLoggedin({ loggedin: true, Usertype: decupledUserInfo.type });
      } catch (error) {
        console.error("Failed to login user:", error);
        setShowErrorLoginModal(true);
      } finally {
      }
    }
  };

  // Effect to login user fater refersh or intialization of react components
  useEffect(() => {
    const checkLoginStatus = () => {
      if (
        Loggedin.loggedin !== true &&
        localStorage.getItem("loggedintoken") &&
        localStorage.getItem("loggedintoken") !== ""
      ) {
        const decodedTokenValues = jwt_decode(
          localStorage.getItem("loggedintoken")
        );

        ReEnter(decodedTokenValues.Email);
      }
    };
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [Loggedin.loggedin]);
  //Function to login user fater refersh or intialization of react components
  const ReEnter = async (email) => {
    try {
      const gottenUserInfo = await getItems(email);

      const itemWithHighestDate = gottenUserInfo.reduce((prev, current) => {
        return prev.Date > current.Date ? prev : current;
      });

      let decupledUserInfo = itemWithHighestDate.Data.data;

      decupledUserInfo = {
        ...decupledUserInfo,
        userid: itemWithHighestDate.ItemID,
      };
      setUserInfo(decupledUserInfo);

      setLoggedin({ loggedin: true, Usertype: decupledUserInfo.type });
    } catch (error) {
      console.error("Failed to login user:", error);
    }
  };

  return (
    <LoggedinContext.Provider
      value={{
        Loggedin,
        setLoggedin,
        userInfo,
        setUserInfo,
        LoginUser,
        showErrorLoginModal,
        setShowErrorLoginModal,
      }}
    >
      {children}
    </LoggedinContext.Provider>
  );
}

export { LoggedinProvider, LoggedinContext };
