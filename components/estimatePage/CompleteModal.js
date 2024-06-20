import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";

const CompleteModal = ({
  isCompleteModalOpen,
  setIsCompleteModalOpen,
  estimate,
  handleConfirmComplete,
}) => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        setUserId(user.userId);
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
      cpu_type: "Cpu",
      gpu_id: estimate.그래픽카드?.ComponentID,
      gpu_type: "Gpu",
      memory_id: estimate.메모리?.ComponentID,
      memory_type: "Memory",
      storage_id: estimate.SSD?.ComponentID,
      storage_type: "Storage",
      pc_case_id: estimate.케이스?.ComponentID,
      pc_case_type: "PcCase",
      mainboard_id: estimate.메인보드?.ComponentID,
      mainboard_type: "Mainboard",
      cooler_id: estimate.쿨러?.ComponentID,
      cooler_type: "Cooler",
      power_id: estimate.파워?.ComponentID,
      power_type: "Power",
    };

    // 콘솔에 보내는 데이터 출력
    console.log("Sending order data:", orderData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/create_order/`,
        orderData
      );
      console.log("Order created successfully:", response.data);
      handleConfirmComplete();
      router.push("/mypage"); // 주문 생성 후 mypage로 라우팅
    } catch (error) {
      console.error("Failed to create order:", error);
    }
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
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default CompleteModal;
