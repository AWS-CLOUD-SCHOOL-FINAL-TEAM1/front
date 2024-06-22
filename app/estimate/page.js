"use client";
import React, { useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import EstimateTable from "@/components/estimatePage/EstimateTable";
import PartSelection from "@/components/estimatePage/PartSelection";
import CompareModal from "@/components/estimatePage/CompareModal";
import CompleteModal from "@/components/estimatePage/CompleteModal";

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

  return (
    <ScrollShadow hideScrollBar size={100} className="w-full h-[60rem]">
      <div className="m-8 bg-gray-100  h-80vh w-80vw">
        <ScrollShadow hideScrollBar size={100} className="w-full h-[55rem]">
          <div className="bg-white p-4 rounded shadow-md flex flex-col md:flex-row gap-4 ">
            <EstimateTable
              estimate={estimate}
              selectedPart={selectedPart}
              setSelectedPart={setSelectedPart}
              handleComplete={handleComplete}
            />
            <PartSelection
              selectedPart={selectedPart}
              handleCompare={handleCompare}
              handleAddOption={handleAddOption}
              compareParts={compareParts}
              setCompareParts={setCompareParts}
              setIsCompareModalOpen={setIsCompareModalOpen}
            />
          </div>

          <CompareModal
            isCompareModalOpen={isCompareModalOpen}
            handleGoBack={handleGoBack}
            compareParts={compareParts}
          />

          <CompleteModal
            isCompleteModalOpen={isCompleteModalOpen}
            setIsCompleteModalOpen={setIsCompleteModalOpen}
            estimate={estimate}
            handleConfirmComplete={() => setIsCompleteModalOpen(false)}
          />
        </ScrollShadow>
      </div>
    </ScrollShadow>
  );
};

export default Estimate;
