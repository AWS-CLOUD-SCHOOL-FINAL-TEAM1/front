// /components/estimatePage/CompleteModal.js

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { CompleteOrder } from "./api";

const CompleteModal = ({
  isCompleteModalOpen,
  setIsCompleteModalOpen,
  estimate,
  handleConfirmComplete,
}) => {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        setUserId(`google_${user.userId}`);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      alert("User is not logged in");
      return;
    }

    const orderData = {
      user_id: userId,
      cpu_id: estimate.CPU?.ComponentID,
      cpu_type: "CPU",
      gpu_id: estimate.그래픽카드?.ComponentID,
      gpu_type: "GPU",
      memory_id: estimate.메모리?.ComponentID,
      memory_type: "MEMORY",
      storage_id: estimate.SSD?.ComponentID,
      storage_type: "STORAGE",
      pc_case_id: estimate.케이스?.ComponentID,
      pc_case_type: "PcCase",
      mainboard_id: estimate.메인보드?.ComponentID,
      mainboard_type: "MAINBOARD",
      cooler_id: estimate.쿨러?.ComponentID,
      cooler_type: "COOLER",
      power_id: estimate.파워?.ComponentID,
      power_type: "POWER",
    };

    console.log("Sending order data:", orderData); // 로그 추가

    const data = await CompleteOrder(orderData); // JSON.stringify 제거
    console.log("Order created successfully:", data);
    handleConfirmComplete();
    router.push("/mypage");
  };

  const keyFeaturesMap = {
    CPU: ["Core", "Thread", "Clock", "Boost"],
    메인보드: ["Socket", "ChipSet", "Form", "Memory"],
    메모리: ["Company", "UseCase", "RamTiming", "XMP"],
    그래픽카드: ["Manufacturer", "GPU", "BoostClock", "Memory"],
    쿨러: ["Company", "Size", "RPM", "Noise"],
    SSD: ["Company", "Capacity", "Interface", "FormFactor"],
    케이스: ["Company", "Size", "CoolingFan", "PowerSize"],
    파워: ["Company", "MaximumOutput", "PLUS80", "Modular"],
  };

  return (
    <Modal
      isOpen={isCompleteModalOpen}
      onRequestClose={() => setIsCompleteModalOpen(false)}
      contentLabel="Complete Estimate"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-semibold mb-4">Complete Estimate</h2>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <table className="table-auto w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Part</th>
              <th className="border px-4 py-2">Specs</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(estimate).map((partType) => {
              const part = estimate[partType];
              const keyFeatures = keyFeaturesMap[partType] || [];

              return (
                <tr key={partType}>
                  <td className="border px-4 py-2">{partType}</td>
                  <td className="border px-4 py-2">
                    {part
                      ? keyFeatures.map(
                          (feature) =>
                            part[feature] && (
                              <div key={feature}>
                                <strong>{feature}:</strong> {part[feature]}
                              </div>
                            )
                        )
                      : "Not Selected"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 rounded text-white"
          style={{
            background: "#2897ff",
            background:
              "-webkit-linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
            background: "linear-gradient(0deg, #2897ff 0%, #ae46f7 100%)",
          }}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default CompleteModal;
