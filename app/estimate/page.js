"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { cpuData } from "@/data/cpuData";
import { mainboardData } from "@/data/mainboardData";
import { memoryData } from "@/data/memoryData";
import { gpuData } from "@/data/gpuData";
import { coolerData } from "@/data/coolerData";
import { ssdData } from "@/data/ssdData";
import { caseData } from "@/data/caseData";
import { powerData } from "@/data/powerData";
import { useRouter } from "next/navigation";

const optionsData = {
  CPU: cpuData,
  메인보드: mainboardData,
  메모리: memoryData,
  그래픽카드: gpuData,
  쿨러: coolerData,
  SSD: ssdData,
  케이스: caseData,
  파워: powerData,
};

const Estimate = () => {
  const [estimate, setEstimate] = useState({
    CPU: null,
    메인보드: null,
    메모리: null,
    그래픽카드: null,
    쿨러: null,
    SSD: null,
    케이스: null,
    파워: null,
  });

  const [selectedPart, setSelectedPart] = useState("CPU");
  const [compareParts, setCompareParts] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const router = useRouter();

  const handleAddOption = (partType, option) => {
    setEstimate({ ...estimate, [partType]: option });
  };

  const handleCompare = (option) => {
    setCompareParts((prev) => {
      if (prev.includes(option)) {
        return prev.filter((p) => p !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleGoBack = () => {
    setCompareParts([]);
    setIsCompareModalOpen(false);
  };

  const handleComplete = () => {
    setIsCompleteModalOpen(true);
  };

  const handleConfirmComplete = () => {
    setIsCompleteModalOpen(false);
    router.push("/mypage");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow-md flex gap-4 overflow-hidden">
        <div className="w-1/2 overflow-y-auto hide-scrollbar">
          <h1 className="text-3xl font-bold mb-4">New Estimate</h1>
          <table className="table-auto w-full mb-4 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Part</th>
                <th className="border px-4 py-2">Details</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(estimate).map((partType) => (
                <tr
                  key={partType}
                  className={selectedPart === partType ? "bg-blue-100" : ""}
                >
                  <td className="border px-4 py-2">{partType}</td>
                  <td className="border px-4 py-2">
                    {estimate[partType]
                      ? estimate[partType].name
                      : "Not Selected"}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className={`px-2 py-1 rounded ${estimate[partType] ? "bg-blue-400 text-white" : "bg-yellow-400 text-white"}`}
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleComplete}
            >
              Complete
            </button>
          </div>
        </div>

        <div className="w-1/2 overflow-y-auto hide-scrollbar">
          {selectedPart && (
            <div className="p-4 border rounded bg-white">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {selectedPart}
              </h2>

              <table className="table-auto w-full mb-4 bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Select</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Part</th>
                    <th className="border px-4 py-2">Details</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsData[selectedPart].map((option) => (
                    <tr key={option.id}>
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          onChange={() => handleCompare(option)}
                          checked={compareParts.includes(option)}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="border px-4 py-2">{option.name}</td>
                      <td className="border px-4 py-2">
                        {Object.values(option.specs).join(", ")}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="text-blue-500"
                          onClick={() => handleAddOption(selectedPart, option)}
                        >
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
                  onClick={() => setIsCompareModalOpen(true)}
                >
                  Compare
                </button>
              )}
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default Estimate;
