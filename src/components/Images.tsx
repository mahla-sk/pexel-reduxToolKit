import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainImg, toggleFavorite, deleteImg } from "../imageSlice";
import type { AppDispatch } from "../store";
import type { Image } from "../imageSlice";
import type { RootState } from "../store";
import { fetchImages } from "../imageSlice";

interface imageProps {
  images: Image[];
  mainImg: Image | null;
  loading: boolean;
  totalResults: number;
  query: string;
  page: number;
  setPage: (page: number) => void;
}

const Images: React.FC<imageProps> = ({
  images,
  mainImg,
  loading,
  totalResults,
  query,
  page,
  setPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.images.favorites);

  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(9);

  const loadMore = () => {
    if (visibleEnd + 1 < images.length) {
      // Already fetched
      setVisibleStart(visibleStart + 10);
      setVisibleEnd(visibleEnd + 10);
    } else if (images.length < totalResults && !loading) {
      // Fetch next page
      dispatch(fetchImages({ query, page: page + 1 }));
      setPage(page + 1);
      // Do not move visibleEnd yet, wait for new images
    }
  };

  return (
    <div className="allImg">
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
        {images.slice(visibleStart, visibleEnd + 1).map((img) => (
          <div key={img.id} className="thumbnail-wrapper">
            <img
              src={img.src.small}
              onClick={() => dispatch(setMainImg(img))}
            />
            <button
              className="fav-btn"
              onClick={() => dispatch(toggleFavorite(img))}
            >
              ❤️
            </button>
          </div>
        ))}
        {images.length < totalResults ? (
          <button className="more" onClick={loadMore}>
            Load More ({totalResults - images.length} left)
          </button>
        ) : null}
      </div>
      <h3 style={{ color: "white", paddingLeft: "30px" }}>Your Favorites</h3>
      {favorites.length > 0 && (
        <div className="favorites">
          {favorites.map((img) => (
            <div key={img.id} className="fav-wrapper">
              <img
                key={img.id}
                src={img.src.small}
                onClick={() => dispatch(setMainImg(img))}
              />
              <button
                className="eliminate"
                onClick={() => dispatch(deleteImg(img.id))}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Images;
