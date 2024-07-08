import React from "react";
import { Button } from "@nextui-org/button";
import { FaBell, FaBellSlash } from "react-icons/fa";

const HeartButton = ({ isFavorite, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("HeartButton clicked:", isFavorite);
    if (onClick) {
      onClick(e);
    } else {
      console.error("onClick handler is not provided");
    }
  };

  const gradientStyle = isFavorite
    ? {
        background: "#b4ff5e",
        background: "-webkit-linear-gradient(219deg, #b4ff5e 0%, #2263f0 100%)",
        background: "linear-gradient(219deg, #b4ff5e 0%, #2263f0 100%)",
        color: "white",
      }
    : {
        background: "transparent",
        border: "1px solid rgba(0, 98, 244, 0.76)",
        color: "rgba(0, 98, 244, 0.76)",
      };

  return (
    <Button
      auto
      ghost={!isFavorite}
      onClick={handleClick}
      size="sm"
      style={gradientStyle} // Apply gradient style
    >
      {isFavorite ? <FaBell /> : <FaBellSlash />}
    </Button>
  );
};

export default HeartButton;
