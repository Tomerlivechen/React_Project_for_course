import { createContext, useState, useEffect, useContext } from "react";
import {
  postItem,
  getItems,
  updateItem,
  deleteItem,
} from "../Constats/APICommands";
import { LoggedinContext } from "./LoggedinContext";
import { AlertContext } from "./AlertContext";
// Create a context
const CardsContext = createContext();
// Define CardsProvider
function CardsProvider({ children }) {
  // Retrieve user info from context
  const { userInfo } = useContext(LoggedinContext);
  // Retrieve alerts from context
  const {
    FavoritsCardAlert,
    EditedCardAlert,
    CreatCardAlert,
    UnFaviritCardAlert,
    DeletCardAlert,
  } = useContext(AlertContext);
  // States to manage loading , card list, filters and sorted cards list
  const [loading, setLoading] = useState(true);
  const [cardsList, setCardsList] = useState("");
  const [filters, setFilters] = useState("");
  const [storedCardsList, setStoredCardsList] = useState("");
  // Function to get stored cards list from API
  const getStoredCardsList = async () => {
    const catagory = "Cards";
    setLoading(true);
    try {
      const response = await getItems(catagory);

      setStoredCardsList(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
    }
  };
  // Functions to apply different filters to cards list
  useEffect(() => {
    switch (filters) {
      case "MY":
        return filterMyCards();
      case "FAV":
        return filterMyFavCards();
      case "":
        return noFilterCards();
      default:
        return filterMySearchedCards(filters);
    }
  }, [filters, storedCardsList]);

  const filterMyCards = () => {
    let filteredCards = storedCardsList.filter(
      (card) => card.Data.data.creator === userInfo.email
    );
    setCardsList(filteredCards);
    setLoading(false);
  };
  const filterMyFavCards = () => {
    let filteredCards = storedCardsList.filter((card) =>
      card.Data.data.favoritedBy.includes(userInfo.email)
    );
    setCardsList(filteredCards);
    setLoading(false);
  };

  function filterMySearchedCards(searchTerm) {
    let filteredCards = storedCardsList.filter((card) =>
      card.Data.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCardsList(filteredCards);
    setLoading(false);
  }

  const noFilterCards = () => {
    setCardsList(storedCardsList);
    setLoading(false);
  };
  // Effect to handle loading state
  useEffect(() => {
    if (Array.isArray(cardsList)) {
      setLoading(false);
    }
    const intervalId = setInterval(() => {}, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // Effect to fetch stored cards list at the loading of the app
  useEffect(() => {
    getStoredCardsList();
  }, []);
  // Functions to toggle card actions with self explanitory names
  const toggleEditCard = async (data) => {
    const catagory = "Cards";
    try {
      await updateItem(catagory, data.cardID, data);
    } catch (error) {
      console.error("Failed to post card data:", error);
    }
    EditedCardAlert();
    getStoredCardsList();
  };

  const toggleDeleteCard = async (cardID) => {
    const catagory = "Cards";
    try {
      await deleteItem(catagory, cardID);
    } catch (error) {
      console.error("Failed to delete card", error);
    }
    DeletCardAlert();
    getStoredCardsList();
  };

  const toggleFavoriteCard = async (card) => {
    const catagory = "Cards";
    card.Data.data.favoritedBy.push(userInfo.email);
    try {
      await updateItem(catagory, card.Data.data.cardID, card.Data.data);
    } catch (error) {
      console.error("Failed to update favotirs", error);
    }
    FavoritsCardAlert();
    getStoredCardsList();
  };

  const toggleAddCard = async (data) => {
    let card_ID;
    const catagory = "Cards";
    try {
      const cards = await postItem(catagory, data);
      card_ID = cards.ItemID;
    } catch (error) {
      console.error("Failed to post card data:", error);
    }

    data.cardID = card_ID;
    try {
      const cards = await updateItem(catagory, card_ID, data);
      card_ID = cards.ItemID;
    } catch (error) {
      console.error("Failed to post card data:", error);
    }
    CreatCardAlert();
    getStoredCardsList();
  };

  const toggleUnFavoriteCard = async (card) => {
    const catagory = "Cards";

    const index = card.Data.data.favoritedBy.indexOf(userInfo.email);

    if (index !== -1) {
      card.Data.data.favoritedBy.splice(index, 1);
    }

    try {
      await updateItem(catagory, card.Data.data.cardID, card.Data.data);
    } catch (error) {
      console.error("Failed to update favotirs", error);
    }
    UnFaviritCardAlert();
    getStoredCardsList();
  };

  return (
    <CardsContext.Provider
      value={{
        getStoredCardsList,
        setFilters,
        filters,
        loading,
        cardsList,
        toggleUnFavoriteCard,
        toggleEditCard,
        toggleFavoriteCard,
        toggleDeleteCard,
        toggleAddCard,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export { CardsProvider, CardsContext };
