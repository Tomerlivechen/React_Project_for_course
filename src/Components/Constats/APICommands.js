import axios from "axios";
// Constants for API endpoints and project ID
const ProjectID = "cb7ce80a-75cf-408a-ad26-a050eac8d208";
const APILogin =
  "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/login/";
const APIItems =
  "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/item/";
const BaseAPI = "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev";

// Function to retrieve authentication token from local storage
function fetchToken() {
  const token = localStorage.getItem("loggedintoken");
  return token;
}

const api = axios.create({
  baseURL: BaseAPI,
});

// Function to authenticate a user
const loginUser = (email, password) => {
  return api
    .post(`/login/${ProjectID}`, {
      Email: email,
      Password: password,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};
// Function to register a new user
const registerUser = (email, password, name, role = "Guest") => {
  return api
    .post("/user/", {
      ProjectID: ProjectID,
      Email: email,
      Password: password,
      Role: role,
      Name: name,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};
// Function to update user information
const updateUser = (email, password, name, role) => {
  const token = fetchToken();

  return api
    .put(
      `/user/${ProjectID}/${email}`,
      {
        ProjectID: ProjectID,
        Email: email,
        Password: password,
        Name: name,
        Role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};
// Function to retrieve user information
const getUser = (email) => {
  const token = fetchToken();
  return api
    .get(`/user/object/${ProjectID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};
// Function to retrieve a list of users
const getUsers = () => {
  const token = fetchToken();
  return api
    .get(`/user/${ProjectID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};
// Function to delete a user
const deleteUser = (email) => {
  const token = fetchToken();
  return api
    .delete(`/user/object/${ProjectID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};
// Function to add an item
const postItem = (itemCategory, data) => {
  const token = fetchToken();
  const itemsInfo = {
    Data: { data },
    Scope: "Public",
    Date: Date.now(),
  };
  return api
    .post(`/item/${ProjectID}_${itemCategory}`, itemsInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
};

// Function to add user info data as an item category
const userInfoData = (itemCategory, data) => {
  const token = fetchToken();
  return api
    .post(`/item/${ProjectID}_${itemCategory}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
};
// Function to retrieve items from category
const getItems = (itemCategory) => {
  const token = fetchToken();
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  return api
    .get(`/item/${ProjectID}_${itemCategory}`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting items:", error);
      throw error;
    });
};
// Function to update item information
const updateItem = (itemCategory, itemId, data) => {
  const token = fetchToken();
  const itemsInfo = {
    Data: { data },
    Scope: "Public",
    Date: Date.now(),
  };

  return api
    .put(`/item/${ProjectID}_${itemCategory}/${itemId}`, itemsInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};
// Function to delete an item
const deleteItem = (itemCategory, itemId) => {
  const token = fetchToken();
  return api
    .delete(`/item/${ProjectID}_${itemCategory}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};

export {
  getUser,
  userInfoData,
  ProjectID,
  APILogin,
  APIItems,
  fetchToken,
  loginUser,
  registerUser,
  updateUser,
  getUsers,
  postItem,
  updateItem,
  deleteItem,
  deleteUser,
  getItems,
};
