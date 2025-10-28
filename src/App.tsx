import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Images from "./components/images.tsx";
import SearchBar from "./components/TopBar.tsx";
import { fetchImages } from "./imageSlice.ts";
import type { AppDispatch, RootState } from "./store.ts";
import { useState } from "react";

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
    <div className="App">
      <SearchBar search={search} />
      <Images
        images={images}
        mainImg={mainImg}
        loading={loading}
        totalResults={totalResults}
        query={query}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};
export default App;
