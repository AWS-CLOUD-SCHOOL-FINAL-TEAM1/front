// components/CompareModal.js
import React from "react";
import Modal from "react-modal";

const CompareModal = ({ isCompareModalOpen, handleGoBack, compareParts }) => {
  return (
    <Modal
      isOpen={isCompareModalOpen}
      onRequestClose={handleGoBack}
      contentLabel="Compare Parts"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {compareParts.length === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Compare Parts</h2>
          <div className="flex mb-4">
            <div className="w-1/2 text-center">
              <img
                src={compareParts[0].image}
                alt={compareParts[0].name}
                className="w-32 h-32 object-cover mx-auto"
              />
              <h3 className="text-lg font-bold">{compareParts[0].name}</h3>
            </div>
            <div className="w-1/2 text-center">
              <img
                src={compareParts[1].image}
                alt={compareParts[1].name}
                className="w-32 h-32 object-cover mx-auto"
              />
              <h3 className="text-lg font-bold">{compareParts[1].name}</h3>
            </div>
          </div>
          <table className="table-auto w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
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
            Close
          </button>
        </>
      )}
    </Modal>
  );
};

export default CompareModal;
