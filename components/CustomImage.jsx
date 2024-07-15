import React, { useState } from "react";

const CustomImage = ({ src, alt, className, style, placeholder }) => {
  const [finalImageUrl, setFinalImageUrl] = useState(src);

  const handleImageError = () => {
    setFinalImageUrl(placeholder || "/spoid_logo_black.png");
  };

  return (
    <img
      src={finalImageUrl}
      alt={alt}
      className={className}
      style={style}
      onError={handleImageError}
    />
  );
};

export default CustomImage;
