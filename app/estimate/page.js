"use client";
import React, { useState } from "react";
import EstimateTable from "@/components/estimatePage/EstimateTable";
import PartSelection from "@/components/estimatePage/PartSelection";
import CompareModal from "@/components/estimatePage/CompareModal";
import CompleteModal from "@/components/estimatePage/CompleteModal";
import CompatibilityCheckModal from "@/components/estimatePage/CompatibilityCheckModal"; // Ensure this path is correct
import Title from "@/components/Title";

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
  const [isCompatibilityCheckModalOpen, setIsCompatibilityCheckModalOpen] =
    useState(false); // 호환성 체크 모달 상태 추가

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

  const handleCompatibilityCheck = () => {
    setIsCompatibilityCheckModalOpen(true);
  };

  const resetFilters = () => {
    // 필터 상태 초기화
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 overflow-y-auto">
      <Title>견적 내기</Title>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <EstimateTable
          estimate={estimate}
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          handleComplete={handleComplete}
          resetFilters={resetFilters} // resetFilters 콜백 전달
          handleCompatibilityCheck={handleCompatibilityCheck} // handleCompatibilityCheck 콜백 전달
        />
        <PartSelection
          selectedPart={selectedPart}
          handleCompare={handleCompare}
          handleAddOption={handleAddOption}
          compareParts={compareParts}
          setCompareParts={setCompareParts}
          setIsCompareModalOpen={setIsCompareModalOpen}
          resetFilters={resetFilters} // resetFilters 콜백 전달
        />
      </div>

      <CompareModal
        isCompareModalOpen={isCompareModalOpen}
        handleGoBack={handleGoBack}
        compareParts={compareParts}
      />
      <CompatibilityCheckModal
        isCompatibilityCheckModalOpen={isCompatibilityCheckModalOpen}
        setIsCompatibilityCheckModalOpen={setIsCompatibilityCheckModalOpen}
        estimate={estimate}
        handleConfirmCompatibility={() =>
          setIsCompatibilityCheckModalOpen(false)
        }
      />

      <CompleteModal
        isCompleteModalOpen={isCompleteModalOpen}
        setIsCompleteModalOpen={setIsCompleteModalOpen}
        estimate={estimate}
        handleConfirmComplete={() => setIsCompleteModalOpen(false)}
      />
    </div>
  );
};

export default Estimate;
