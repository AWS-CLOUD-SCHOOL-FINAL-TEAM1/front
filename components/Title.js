// components/Title.jsx
import React from "react";

const Title = ({ children }) => {
  return (
    <div className="sataic text-center w-full">
      <h1 className="text-xl md:text-2xl font-semibold  bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent pb-2">
        {children}
      </h1>
      <hr className="w-full left-0 right-0 bottom-0  h-0.5 bg-gradient-to-r from-gray-200 to-gray-400"></hr>
    </div>
  );
};

export default Title;
