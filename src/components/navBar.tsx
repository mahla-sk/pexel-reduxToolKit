import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, HeartOutlined, MenuOutlined } from "@ant-design/icons";
import { Tabs, Drawer, Button, Menu } from "antd";
import "../styles/TopBar.css";
import { useState } from "react";
import { mobileView } from "./mobileView";

interface NavProps {
  children?: React.ReactNode; //so it accepts children
}

const Nav: React.FC<NavProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = mobileView();

  const activeKey = location.pathname === "/favorites" ? "2" : "1";

  const handleNav = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };
  return (
    <div className="nav-tabs-container">
      {isMobile ? (
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
            <div style={{ marginTop: 20, padding: "0 16px" }}>{children}</div>
          </Drawer>
        </>
      ) : (
        <Tabs
          activeKey={activeKey}
          onChange={(key) => navigate(key === "1" ? "/" : "/favorites")}
          items={[
            { key: "1", label: "Home", icon: <HomeOutlined /> },
            { key: "2", label: "Favorites", icon: <HeartOutlined /> },
          ]}
        />
      )}
    </div>
  );
};
export default Nav;
