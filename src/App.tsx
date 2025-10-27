import React from "react";
import ReactDOM from "react-dom/client";
import type { RootState, AppDispatch } from "./store.ts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchImages, setMainImg } from "./imageSlice.ts";
import "./App.css";

const App: React.FC = () => {
  //react.fc is a type for functional components in react with typescript
  const dispatch = useDispatch<AppDispatch>();
  const { images, mainImg, loading } = useSelector(
    //useselector reads data from the store, and destructure the data into these variables that are shown in the ui
    (state: RootState) => state.images
  );
  const [query, setQuery] = React.useState("");

  const search = () => {
    if (query.trim() !== "") {
      dispatch(fetchImages(query));
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        placeholder="search for an image..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <div className="mainImg">
        {loading ? (
          <p>Loading...</p>
        ) : mainImg ? (
          <img src={mainImg.src.large} />
        ) : (
          <p>No image selected</p>
        )}
      </div>
      <div className="thumbnails">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src.small}
            onClick={() => dispatch(setMainImg(img))}
          ></img>
        ))}
      </div>
    </div>
  );
};

export default App;
