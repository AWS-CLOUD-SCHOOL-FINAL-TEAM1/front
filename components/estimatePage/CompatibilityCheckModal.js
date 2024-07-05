// /components/estimatePage/CompatibilityCheckModal.js

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { ClipLoader } from "react-spinners";

const CompatibilityCheckModal = ({
  isCompatibilityCheckModalOpen,
  setIsCompatibilityCheckModalOpen,
  estimate,
  handleConfirmCompatibility,
}) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [compatibilityMessage, setCompatibilityMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        setUserId(`google_${user.userId}`);
      }
    };

    fetchUserId();

    // Simulate a 3-second loading time for compatibility check
    const timer = setTimeout(() => {
      setLoading(false);
      setCompatibilityMessage("호환성 검사 통과했습니다 ✅");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      alert("User is not logged in");
      return;
    }

    // This is where you'd send data to the backend in the future
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

    console.log("Sending order data:", orderData);

    handleConfirmCompatibility();
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
      isOpen={isCompatibilityCheckModalOpen}
      onRequestClose={() => setIsCompatibilityCheckModalOpen(false)}
      contentLabel="Compatibility Check"
      className="modal"
      overlayClassName="modal-overlay"
      style={{
        content: {
          width: "600px",
          height: "400px",
          margin: "auto",
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Compatibility Check</h2>
      <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
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
      <div className="mt-4">
        {loading ? (
          <ClipLoader size={35} color={"#123abc"} loading={loading} />
        ) : (
          <div className="text-green-600 font-semibold">
            {compatibilityMessage}
          </div>
        )}
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

export default CompatibilityCheckModal;
