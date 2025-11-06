import React from "react";
import Toggle from "./toggle";
import { mobileView } from "./mobileView";
import MobileMenu from "./mobileMenu";
import DesktopMenu from "./desktopMenu";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const isMobile = mobileView();

  return (
    <>
      <header className="top-container">
        {isMobile ? (
          //<Nav>
          //  <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
          //</Nav>

          <MobileMenu darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          //<>
          //</div>  <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
          //</div>  <Nav />
          //</div></>
          <DesktopMenu darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </header>
    </>
  );
};
export default Header;
