// components/CompleteModal.js
import React from "react";
import Modal from "react-modal";

const CompleteModal = ({
  isCompleteModalOpen,
  setIsCompleteModalOpen,
  estimate,
  handleConfirmComplete,
}) => {
  return (
    <Modal
      isOpen={isCompleteModalOpen}
      onRequestClose={() => setIsCompleteModalOpen(false)}
      contentLabel="Complete Estimate"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-semibold mb-4">Complete Estimate</h2>
      <table className="table-auto w-full bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Part</th>
            <th className="border px-4 py-2">Specs</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(estimate).map((partType) => (
            <tr key={partType}>
              <td className="border px-4 py-2">{partType}</td>
              <td className="border px-4 py-2">
                {estimate[partType]
                  ? Object.values(estimate[partType].specs).join(", ")
                  : "Not Selected"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleConfirmComplete}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default CompleteModal;
