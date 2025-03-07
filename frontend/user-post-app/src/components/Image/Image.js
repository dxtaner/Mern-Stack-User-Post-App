import React from "react";
import "./Image.css";

const Image = (props) => {
  if (!props.imageUrl) {
    return null;
  }

  return (
    <div
      className="image"
      style={{
        backgroundImage: `url('http://localhost:3033/${props.imageUrl}')`,
        backgroundSize: props.contain ? "contain" : "cover",
        backgroundPosition: props.left ? "left" : "center",
      }}
    />
  );
};

export default Image;
