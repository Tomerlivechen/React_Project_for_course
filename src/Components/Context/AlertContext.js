import { createContext, useState, useEffect } from "react";

// Create a context
const AlertContext = createContext();
// Define AlertProvider
function AlertProvider({ children }) {
  // State to manage the type of alert
  const [AlertType, setAlertType] = useState("none");

  // Set up an effect to clear the alert after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertType("none");
    }, 5000);

    return () => clearInterval(interval);
  }, [AlertType]);

  // Functions to trigger different types of alerts
  const LoggedInAlert = () => {
    setAlertType("LoggedInAlert");
  };

  const FavoritsCardAlert = () => {
    setAlertType("FavoriteCardAlert");
  };

  const CreatCardAlert = () => {
    setAlertType("CreateCardAlert");
  };

  const UnFaviritCardAlert = () => {
    setAlertType("UnfavoriteCardAlert");
  };
  const DeletCardAlert = () => {
    setAlertType("DeleteCardAlert");
  };

  const EditedCardAlert = () => {
    setAlertType("EditedCardAlert");
  };

  const DeletUserAlert = () => {
    setAlertType("DeleteUserAlert");
  };
  const EditedUserAlert = () => {
    setAlertType("EditedUserAlert");
  };

  return (
    <AlertContext.Provider
      value={{
        AlertType,
        EditedCardAlert,
        DeletUserAlert,
        EditedUserAlert,
        LoggedInAlert,
        FavoritsCardAlert,
        CreatCardAlert,
        UnFaviritCardAlert,
        DeletCardAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export { AlertProvider, AlertContext };
