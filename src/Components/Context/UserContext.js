import { createContext } from "react";
import {
  registerUser,
  updateUser,
  loginUser,
  postItem,
  updateItem,
} from "../Constats/APICommands";
// Create a context
const UserContext = createContext();
// Define UserProvider
function UserProvider({ children }) {
  // Function to handle adding a user
  const toggleAdduser = async (updateFormData, updatedUserInfo) => {
    const data = updatedUserInfo;

    try {
      await registerUser(
        updateFormData.Email,
        updateFormData.Password,
        updateFormData.Name,
        updateFormData.Role
      );
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      //After registering the user login the user
      try {
        const token = await loginUser(
          updateFormData.Email,
          updateFormData.Password
        );

        localStorage.setItem("loggedintoken", token.token);
      } catch (error) {
        console.error("Failed to login user:", error);
      } finally {
        //After logging in the user, add the user info into an item because the API allows the users to only have Email, Name, and password (also Role, but Role is always Guest, so not really relevant)
        try {
          await postItem(updateFormData.Email, data, "Private");
        } catch (error) {
          console.error("Failed to post user data:", error);
        }
      }
    }
  };
  // Function to handle editing a user
  const toggleEddituser = async (data) => {
    try {
      await updateItem(data.email, data.userid, data);
    } catch (error) {
      console.error("Failed to post user data:", error);
    }
    try {
      await updateUser(data.email, data.password, data.firstname, data.type);
    } catch (error) {
      console.error("Failed to post user data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        toggleAdduser,
        toggleEddituser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
