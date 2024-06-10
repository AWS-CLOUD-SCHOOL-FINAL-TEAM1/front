"use client";

import { useState } from "react";

const optionsData = [
  {
    id: 1,
    name: "CPU",
    options: [
      {
        id: 1,
        name: "인텔 i5-14세대 14400F",
        specs: {
          spec1: "3.0 GHz",
          spec2: "6 cores",
          spec3: "12 threads",
          spec4: "65W TDP",
        },
      },
      {
        id: 2,
        name: "AMD Ryzen 5 5600X",
        specs: {
          spec1: "3.7 GHz",
          spec2: "6 cores",
          spec3: "12 threads",
          spec4: "65W TDP",
        },
      },
    ],
  },
  // 다른 부품 데이터 추가
];

const Estimate = () => {
  const [estimate, setEstimate] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [compareParts, setCompareParts] = useState([]);

  const handleAddOption = (option) => {
    setEstimate([...estimate, option]);
    setSelectedPart(null);
  };

  const handleCompare = (part) => {
    setCompareParts((prev) => {
      if (prev.includes(part)) {
        return prev.filter((p) => p !== part);
      } else {
        return [...prev, part];
      }
    });
  };

  const handleGoBack = () => {
    setCompareParts([]);
    setSelectedPart(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">New Estimate</h1>
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
              <td className="border px-4 py-2">{part.name}</td>
              <td className="border px-4 py-2">
                {Object.values(part.specs).join(", ")}
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => setSelectedPart(index)}>Change</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-center">
              <button onClick={() => setSelectedPart("New Part")}>
                Add Part
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {selectedPart !== null && (
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Select Part</h2>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Part</th>
                <th className="border px-4 py-2">Details</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {optionsData
                .find((o) => o.name === "CPU")
                .options.map((option) => (
                  <tr key={option.id}>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        onChange={() => handleCompare(option)}
                        checked={compareParts.includes(option)}
                      />
                    </td>
                    <td className="border px-4 py-2">{option.name}</td>
                    <td className="border px-4 py-2">
                      {Object.values(option.specs).join(", ")}
                    </td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleAddOption(option)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {compareParts.length === 2 && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedPart(null)}
            >
              Compare
            </button>
          )}
        </div>
      )}

      {compareParts.length === 2 && (
        <div className="p-4 border rounded mt-4">
          <h2 className="text-xl font-semibold mb-4">Compare Parts</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">{compareParts[0].name}</th>
                <th className="border px-4 py-2">{compareParts[1].name}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(compareParts[0].specs).map((spec) => (
                <tr key={spec}>
                  <td className="border px-4 py-2">{spec}</td>
                  <td className="border px-4 py-2">
                    {compareParts[0].specs[spec]}
                  </td>
                  <td className="border px-4 py-2">
                    {compareParts[1].specs[spec]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Estimate;
