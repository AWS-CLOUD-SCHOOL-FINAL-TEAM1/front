"use client";

import { myCardData } from "@/data/myCardData";
import { useState } from "react";

const EstimatePage = ({ params }) => {
  const { id } = params;
  const card = myCardData.find((card) => card.id.toString() === id);

  const [estimate, setEstimate] = useState(
    card ? Object.entries(card.details) : []
  );

  if (!card) {
    if (typeof window !== "undefined") {
      window.location.href = "/404";
    }
    return null;
  }

  const handleAddOption = (option) => {
    setEstimate([...estimate, option]);
  };

  const handleChangeOption = (index, option) => {
    const newEstimate = [...estimate];
    newEstimate[index] = option;
    setEstimate(newEstimate);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Estimate for {card.title}</h1>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Part</th>
            <th className="border px-4 py-2">Details</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {estimate.map((part, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{part[0]}</td>
              <td className="border px-4 py-2">{part[1]}</td>
              <td className="border px-4 py-2">
                <button onClick={() => setSelectedPart(index)}>Change</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstimatePage;
