import { createContext, useState, useEffect } from "react";
import DarklogoImage from "../Images/Cards logo Dark.png";
import LightlogoImage from "../Images/Cards logo Light.png";
// Create a context
const ThemeContext = createContext();

// Define ThemeProvider
function ThemeProvider({ children }) {
  // State to manage the current theme ("Day" or "Night")
  const [theme, setThem] = useState("Day");
  // State to manage theme-specific properties (e.g., colors, icons)
  const [themeProps, setThemProps] = useState("");
  // Function to toggle between Day and Night themes
  const toggleTheme = () => {
    setThem((prevTheme) => (prevTheme === "Day" ? "Night" : "Day"));
  };
  // Effect to set theme-specific properties based on the current theme
  useEffect(() => {
    if (theme === "Day") {
      setThemProps({
        NavbarMain: "primary-subtle",
        NavBarButtons: "outline-dark",
        ThemeIcon: "bi bi-lightbulb",
        FooterBarMain: "bg-primary-subtle",
        FooterBarButtons: "outline-dark",
        ModalText: "text-dark",
        ModalBG: "bg-info-subtle",
        ModalButtons: "outline-dark",
        CardBG: "bg-white",
        CardText: "text-dark",
        CardBtn: "outline-dark",
        Logo: LightlogoImage,
        ModalBorderStyle: "border border-3 border-info rounded-3 ",
      });
    } else {
      setThemProps({
        NavbarMain: "dark",
        NavBarButtons: "outline-success",
        ThemeIcon: "bi bi-lightbulb-off",
        FooterBarMain: "bg-dark",
        FooterBarButtons: "outline-success",
        ModalText: "text-light",
        ModalBG: "bg-dark",
        ModalButtons: "outline-success",
        CardBG: "bg-secondary",
        CardText: "text-light",
        CardBtn: "outline-light",
        Logo: DarklogoImage,
        ModalBorderStyle: "border border-3 border-black rounded-3",
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeProps, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
