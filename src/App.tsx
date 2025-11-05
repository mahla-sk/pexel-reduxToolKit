import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "antd/dist/reset.css";
import Home from "./pages/Home.tsx";
import SearchBar from "./components/TopBar.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import { fetchImages } from "./store/images/actions.ts";
import type { AppDispatch, RootState } from "./store/store.ts";
import { useState } from "react";
import {
  Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Toggle from "./components/toggle.tsx";
import { ConfigProvider, theme } from "antd";
import Nav from "./components/navBar.tsx";
import "./styles/Home.css";
import "./styles/Favorite.css";
import { mobileView } from "./components/mobileView.tsx";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, mainImg, loading, totalResults } = useSelector(
    (state: RootState) => state.images
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [darkMode, setDarkMode] = useState(false);
  const isMobile = mobileView();
  const location = useLocation();
  const [favQuery, setFavQuery] = useState("");

  const search = (newQuery: string) => {
    const currentPath = location.pathname;
    if (currentPath === "/favorites") {
      setFavQuery(newQuery);
    } else {
      if (newQuery.trim() !== "") {
        setQuery(newQuery);
        setPage(1);
        dispatch(fetchImages({ query: newQuery, page: 1 }));
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div
        className={`App ${darkMode ? "dark-mode" : ""}`}
        style={{
          backgroundColor: darkMode ? "#181C14" : "#f6f0f0",
          color: darkMode ? "#fff" : "#000",
          minHeight: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <SearchBar search={search} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                images={images}
                mainImg={mainImg}
                loading={loading}
                totalResults={totalResults}
                query={query}
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route
            path="/favorites"
            element={<FavoritesPage query={favQuery} />}
          />
        </Routes>
      </div>
    </ConfigProvider>
  );
};
export default App;
