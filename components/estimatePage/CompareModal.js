// /components/estimatePage/comepareModal.js
import React from "react";
import Modal from "react-modal";

const CompareModal = ({ isCompareModalOpen, handleGoBack, compareParts }) => {
  if (compareParts.length !== 2) return null;

  const part1 = compareParts[0];
  const part2 = compareParts[1];

  const keyFeaturesMap = {
    Cpu: ["Core", "Thread", "Clock", "Boost"],
    Memory: ["Company", "UseCase", "RamTiming", "XMP"],
    Gpu: ["Manufacturer", "GPU", "BoostClock", "Memory"],
    Storage: ["Company", "Capacity", "Interface", "FormFactor"],
    PcCase: ["Company", "Size", "CoolingFan", "PowerSize"],
    Mainboard: ["Company", "Socket", "ChipSet", "Form"],
    Power: ["Company", "MaximumOutput", "PLUS80", "Modular"],
    Cooler: ["Company", "Size", "RPM", "Noise"],
  };

  const partType = part1.Type;
  const keyFeatures = keyFeaturesMap[partType] || [];

  return (
    <Modal
      isOpen={isCompareModalOpen}
      onRequestClose={handleGoBack}
      contentLabel="Compare Parts"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-semibold mb-4">Compare Parts</h2>
      <div className="flex mb-4">
        <div className="w-1/2 text-center">
          <img
            src={part1.ImageURL}
            alt={part1.Model}
            className="w-32 h-32 object-cover mx-auto"
          />
          <h3 className="text-lg font-bold">{part1.Model}</h3>
        </div>
        <div className="w-1/2 text-center">
          <img
            src={part2.ImageURL}
            alt={part2.Model}
            className="w-32 h-32 object-cover mx-auto"
          />
          <h3 className="text-lg font-bold">{part2.Model}</h3>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <table className="table-auto w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Feature</th>
              <th className="border px-4 py-2">{part1.Model}</th>
              <th className="border px-4 py-2">{part2.Model}</th>
            </tr>
          </thead>
          <tbody>
            {keyFeatures.map((feature) => (
              <tr key={feature}>
                <td className="border px-4 py-2">{feature}</td>
                <td className="border px-4 py-2">{part1[feature]}</td>
                <td className="border px-4 py-2">{part2[feature]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGoBack}
      >
        Close
      </button>
    </Modal>
  );
};

export default CompareModal;
