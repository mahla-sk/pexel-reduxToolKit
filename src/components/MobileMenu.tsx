import React from "react";
import { HomeOutlined, HeartOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Button, Menu } from "antd";
import "../styles/TopBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "./toggle";

interface MobileMenuProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ darkMode, setDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeKey = location.pathname === "/favorites" ? "2" : "1";
  const navigate = useNavigate();
  const handleNav = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={
          <MenuOutlined
            style={{
              fontSize: 24,
              color: "#5e4808ff",
              backgroundColor: "transparent",
            }}
          />
        }
        onClick={() => setDrawerOpen(true)}
        style={{
          position: "absolute",
          top: 25,
          right: 10,
          zIndex: 1000,
          backgroundColor: "transparent",
        }}
      />
      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={(e) => handleNav(e.key === "1" ? "/" : "/favorites")}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "2",
              icon: <HeartOutlined />,
              label: "Favorites",
            },
          ]}
        />
        <div style={{ marginTop: 20, padding: "0 16px" }}>
          <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </Drawer>
    </>
  );
};
export default MobileMenu;
