import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Images from "./components/Images.tsx";
import SearchBar from "./components/TopBar.tsx";
import FavoritesPage from "./components/FavoritesPage.tsx";
import { fetchImages } from "./imageSlice.ts";
import type { AppDispatch, RootState } from "./store.ts";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
        <SearchBar search={search} />
        <div className="nav-links">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/favorites" className="nav-btn">
            Favorites
          </Link>
        </div>

        <Routes>
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
