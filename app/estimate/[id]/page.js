// app/estimate/[id]/page.js
"use client";

import React, { useState } from "react";
import { ScrollShadow } from "@nextui-org/react";

import { useRouter } from "next/navigation";

import EstimateTable from "@/components/estimatePage/EstimateTable";
import PartSelection from "@/components/estimatePage/PartSelection";
import CompareModal from "@/components/estimatePage/CompareModal";
import CompleteModal from "@/components/estimatePage/CompleteModal";

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

const EstimatePage = ({ params }) => {
  const { id } = params;
  const card = myCardData.find((card) => card.id.toString() === id);

  const [estimate, setEstimate] = useState(
    card
      ? Object.entries(card.details).reduce((acc, [key, value]) => {
          acc[key] = { name: value, specs: {} };
          return acc;
        }, {})
      : {}
  );

  const [selectedPart, setSelectedPart] = useState("CPU");
  const [compareParts, setCompareParts] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const router = useRouter();

  if (!card) {
    if (typeof window !== "undefined") {
      window.location.href = "/404";
    }
    return null;
  }

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
    <ScrollShadow hideScrollBar size={100} className="w-full h-[55rem]">
      <div className="p-8 bg-gray-100 min-h-screen">
        <ScrollShadow size={100} className="w-full h-[55rem]">
          <div className="bg-white p-4 rounded shadow-md flex flex-col md:flex-row gap-4 ">
            <EstimateTable
              estimate={estimate}
              selectedPart={selectedPart}
              setSelectedPart={setSelectedPart}
              handleComplete={handleComplete}
            />

            <PartSelection
              selectedPart={selectedPart}
              optionsData={optionsData}
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
            handleConfirmComplete={handleConfirmComplete}
          />
        </ScrollShadow>
      </div>
    </ScrollShadow>
  );
};

export default EstimatePage;
