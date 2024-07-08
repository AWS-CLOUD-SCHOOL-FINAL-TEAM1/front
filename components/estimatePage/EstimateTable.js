import React from "react";

const EstimateTable = ({
  estimate,
  selectedPart,
  setSelectedPart,
  handleComplete,
  resetFilters,
  handleCompatibilityCheck, // Prop 추가
}) => {
  const isComplete = Object.values(estimate).every((part) => part !== null);

  const handlePartSelection = (partType) => {
    setSelectedPart(partType);
    resetFilters(); // 필터 상태 초기화
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <br></br>
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
                  className={`px-2 py-1 rounded text-white`}
                  style={
                    estimate[partType]
                      ? {
                          background: "rgba(0, 98, 244, 0.76)",
                          background:
                            "-webkit-linear-gradient(0deg, rgba(0, 98, 244, 0.76) 0%, #8aa2d4 100%)",
                          background:
                            "linear-gradient(0deg, rgba(0, 98, 244, 0.76) 0%, #8aa2d4 100%)",
                        }
                      : {
                          background: "rgba(255, 235, 59, 0.76)",
                          background:
                            "-webkit-linear-gradient(0deg, rgba(255, 235, 59, 0.76) 0%, #ffd700 100%)",
                          background:
                            "linear-gradient(0deg, rgba(255, 235, 59, 0.76) 0%, #ffd700 100%)",
                        }
                  }
                  onClick={() => handlePartSelection(partType)}
                >
                  {estimate[partType] ? "Change" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-4 py-2 rounded text-white"
          style={{
            background: "#2897ff",
            background:
              "-webkit-linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
            background: "linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
          }}
          onClick={handleCompatibilityCheck}
          disabled={!isComplete}
        >
          ▶ AI 호환성 검사
        </button>
        <button
          className={`text-white px-4 py-2 rounded ${
            isComplete ? "" : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            background: isComplete
              ? "linear-gradient(0deg, #ae46f7 0%, #2897ff 100%)"
              : "gray",
          }}
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
          견적 담기
        </button>
      </div>
    </div>
  );
};

export default EstimateTable;
