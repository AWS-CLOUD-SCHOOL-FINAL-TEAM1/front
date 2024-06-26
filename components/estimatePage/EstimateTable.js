// /components/estimatePage/EstimateTable.js

import React from "react";

const EstimateTable = ({
  estimate,
  selectedPart,
  setSelectedPart,
  handleComplete,
}) => {
  const isComplete = Object.values(estimate).every((part) => part !== null);

  return (
    <div className="w-full md:w-1/2 p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        My Spec Card
      </h1>
      <table className="table-auto w-full mb-4 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 md:px-4 py-2">Part</th>
            <th className="border px-2 md:px-4 py-2">Details</th>
            <th className="border px-2 md:px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(estimate).map((partType) => (
            <tr
              key={partType}
              className={selectedPart === partType ? "bg-blue-100" : ""}
            >
              <td className="border px-2 md:px-4 py-2">{partType}</td>
              <td className="border px-2 md:px-4 py-2">
                {estimate[partType] ? estimate[partType].Model : "Not Selected"}
              </td>
              <td className="border px-2 md:px-4 py-2">
                <button
                  className={`px-2 py-1 rounded ${
                    estimate[partType]
                      ? "bg-blue-400 text-white"
                      : "bg-yellow-400 text-white"
                  }`}
                  onClick={() => setSelectedPart(partType)}
                >
                  {estimate[partType] ? "Change" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isComplete ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={
            isComplete
              ? handleComplete
              : () =>
                  alert(
                    "Please select all parts before completing the estimate."
                  )
          }
          disabled={!isComplete}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default EstimateTable;
