import React from "react";
import Nav from "./navBar";
import Toggle from "./toggle";
import { mobileView } from "./mobileView";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const isMobile = mobileView();

  return (
    <div className="top-container">
      {isMobile ? (
        <Nav>
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Nav>
      ) : (
        <>
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <Nav />
        </>
      )}
    </div>
  );
};
export default Header;
