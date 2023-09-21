import { createContext, useState, useEffect, useContext } from "react";
import { updateUser, getUsers, deleteUser } from "../Constats/APICommands";

import { AlertContext } from "./AlertContext";
// Create context
const UserListContext = createContext();
// Define UserListProvider
function UserListProvider({ children }) {
  // Calles alert functions from AlertContext
  const { DeletUserAlert, EditedUserAlert } = useContext(AlertContext);
  // States are variables for managing users data
  const [userLoading, setUserLoading] = useState(true);
  const [userFilters, setUserFilters] = useState("");
  const [filteredUsersList, setfilteredUsersList] = useState([]);
  const { CustomAlert } = useContext(AlertContext);
  // Function to fetch stored user data
  const getStoredUsersList = async () => {
    setUserLoading(true);
    try {
      const response = await getUsers();

      setfilteredUsersList(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setUserLoading(false);
    }
  };
  // Effect to fetch user list an the loading of the app
  useEffect(() => {
    getStoredUsersList();
  }, []);
  // Effect to handle loading state
  useEffect(() => {
    if (filteredUsersList) {
      setUserLoading(false);
    }
    const intervalId = setInterval(() => {}, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // Function to edit user data
  const toggleEditUser = async (data) => {
    try {
      await updateUser(data.Email, data.Password, data.Name, data.Role);
    } catch (error) {
      CustomAlert("warning", "Failed to post card data");
      console.error("Failed to post card data:", error);
    }
    EditedUserAlert();
    getStoredUsersList();
  };
  // Function to delete a user
  const toggleDeleteUser = async (email) => {
    try {
      await deleteUser(email);
    } catch (error) {
      console.error("Failed to delete card", error);
    }
    DeletUserAlert();
    getStoredUsersList();
  };

  return (
    <UserListContext.Provider
      value={{
        toggleEditUser,
        toggleDeleteUser,
        userFilters,
        setUserFilters,
        userLoading,
        filteredUsersList,
      }}
    >
      {children}
    </UserListContext.Provider>
  );
}

export { UserListContext, UserListProvider };
