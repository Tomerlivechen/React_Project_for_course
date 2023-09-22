import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../Context/ThemeContext";
import { NavBar } from "./NavBar";
import { FooterBar } from "./FooterBar";
import { UserProvider } from "../Context/UserContext";
import { LoggedinProvider } from "../Context/LoggedinContext";
import { CardsProvider } from "../Context/CardContext";
import { MainPage } from "./MainPage";
import { AlertProvider } from "../Context/AlertContext";
import { Protection } from "../Constats/Protection";
import { UserListProvider } from "../Context/UserListContext";
import { Sandbox } from "./SandBox";
import { About } from "./About";

function RouterControler() {
  return (
    <>
      <Router>
        <ThemeProvider>
          <LoggedinProvider>
            <AlertProvider>
              <CardsProvider>
                <UserProvider>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />

                    <Route
                      path="/sandbox"
                      element={
                        <Protection>
                          <UserListProvider>
                            <Sandbox />
                          </UserListProvider>
                        </Protection>
                      }
                    />
                  </Routes>
                  <FooterBar />
                </UserProvider>
              </CardsProvider>
            </AlertProvider>
          </LoggedinProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}
export { RouterControler };
