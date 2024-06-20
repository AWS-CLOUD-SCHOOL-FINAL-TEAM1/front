"use client";
import React, { useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import axios from "axios";
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

  const handleConfirmComplete = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/create_order/", {
        user_id: "jms",
        cpu_id: estimate.CPU.ComponentID,
        cpu_type: estimate.CPU.Type,
        gpu_id: estimate.그래픽카드.ComponentID,
        gpu_type: estimate.그래픽카드.Type,
        memory_id: estimate.메모리.ComponentID,
        memory_type: estimate.메모리.Type,
        storage_id: estimate.SSD.ComponentID,
        storage_type: estimate.SSD.Type,
        pc_case_id: estimate.케이스.ComponentID,
        pc_case_type: estimate.케이스.Type,
        mainboard_id: estimate.메인보드.ComponentID,
        mainboard_type: estimate.메인보드.Type,
        cooler_id: estimate.쿨러.ComponentID,
        cooler_type: estimate.쿨러.Type,
        power_id: estimate.파워.ComponentID,
        power_type: estimate.파워.Type,
      });
      setIsCompleteModalOpen(false);
      router.push("/mypage");
    } catch (error) {
      console.error("Failed to create order:", error);
    }
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
            handleConfirmComplete={handleConfirmComplete}
          />
        </ScrollShadow>
      </div>
    </ScrollShadow>
  );
};

export default Estimate;
