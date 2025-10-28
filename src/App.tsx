import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Images from "./components/images.tsx";
import SearchBar from "./components/searchBar.tsx";
import { fetchImages } from "./imageSlice.ts";
import type { AppDispatch, RootState } from "./store.ts";

const App: React.FC = () => {
  //react.fc is a type for functional components in react with typescript
  const dispatch = useDispatch<AppDispatch>();
  const { images, mainImg, loading } = useSelector(
    //useselector reads data from the store, and destructure the data into these variables that are shown in the ui
    (state: RootState) => state.images
  );

  const search = (query: string) => {
    if (query.trim() !== "") {
      dispatch(fetchImages(query));
    }
  };

  return (
    <div className="App">
      <SearchBar search={search} />
      <Images images={images} mainImg={mainImg} loading={loading} />
    </div>
  );
};

export default App;
