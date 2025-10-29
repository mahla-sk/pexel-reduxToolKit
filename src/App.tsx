import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "antd/dist/reset.css";
import Images from "./components/Images.tsx";
import SearchBar from "./components/TopBar.tsx";
import FavoritesPage from "./components/FavoritesPage.tsx";
import { fetchImages } from "./store/images/actions.ts";
import type { AppDispatch, RootState } from "./store/store.ts";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Tabs } from "antd";
import { HomeOutlined, HeartOutlined } from "@ant-design/icons";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname === "/favorites" ? "2" : "1";

  return (
    <div className="nav-tabs-container">
      <Tabs
        activeKey={activeKey}
        onChange={(key) => navigate(key === "1" ? "/" : "/favorites")}
        items={[
          { key: "1", label: "Home", icon: <HomeOutlined /> },
          { key: "2", label: "Favorites", icon: <HeartOutlined /> },
        ]}
      />
    </div>
  );
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, mainImg, loading, totalResults } = useSelector(
    (state: RootState) => state.images
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const search = (newQuery: string) => {
    if (newQuery.trim() !== "") {
      setQuery(newQuery);
      setPage(1);
      dispatch(fetchImages({ query: newQuery, page: 1 }));
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="top-elements">
          <SearchBar search={search} />
          <Nav />
        </div>
        <Routes>
          /
          <Route
            path="/"
            element={
              <Images
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
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
