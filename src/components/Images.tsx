import React from "react";
import { useDispatch } from "react-redux";
import { setMainImg } from "../imageSlice";
import type { AppDispatch } from "../store";
import type { Image } from "../imageSlice";

interface imageProps {
  images: Image[];
  mainImg: Image | null;
  loading: boolean;
}

const Images: React.FC<imageProps> = ({ images, mainImg, loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  

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

export default Images;
