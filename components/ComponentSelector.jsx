"use client";

import React from "react";

const ComponentSelector = ({ component, options, selected, onChange }) => {
  return (
    <div className="flex justify-between items-center my-2">
      <span className="font-bold">{component}</span>
      <select
        value={selected}
        onChange={(e) => onChange(component, e.target.value)}
        className="border rounded p-1"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComponentSelector;
