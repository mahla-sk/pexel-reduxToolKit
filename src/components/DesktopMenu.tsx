import React from "react";
import { HomeOutlined, HeartOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Button, Menu, Tabs } from "antd";
import "../styles/TopBar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Toggle from "./toggle";

interface DesktopMenuProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname === "/favorites" ? "2" : "1";

  return (
    <div className="desktop-header">
      <Tabs
        className="tabs"
        activeKey={activeKey}
        onChange={(key) => navigate(key === "1" ? "/" : "/favorites")}
        items={[
          { key: "1", label: "Home", icon: <HomeOutlined /> },
          { key: "2", label: "Favorites", icon: <HeartOutlined /> },
        ]}
      />
      <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};
export default DesktopMenu;
