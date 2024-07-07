import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";
import { ClipLoader } from "react-spinners";
import { CompatibilityCheckAPI } from "./api";

const CompatibilityCheckModal = ({
  isCompatibilityCheckModalOpen,
  setIsCompatibilityCheckModalOpen,
  estimate,
  handleConfirmCompatibility,
}) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [compatibilityMessage, setCompatibilityMessage] = useState("");
  const [compatibilityResult, setCompatibilityResult] = useState(null);
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

    setLoading(true);

    try {
      const response = await CompatibilityCheckAPI(estimate);
      setCompatibilityResult(response);

      if (response.content[0].text.includes("문제점이 있습니다")) {
        setCompatibilityMessage("호환성 검사 실패 ❌");
      } else {
        setCompatibilityMessage("호환성 검사 통과했습니다 ✅");
      }
    } catch (error) {
      console.error("Error during compatibility check:", error);
      setCompatibilityMessage("호환성 검사 중 오류가 발생했습니다 ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsCompatibilityCheckModalOpen(false);
    setCompatibilityMessage("");
    setCompatibilityResult(null);
  };

  return (
    <Modal
      isOpen={isCompatibilityCheckModalOpen}
      onRequestClose={handleClose}
      contentLabel="Compatibility Check"
      className="modal"
      overlayClassName="modal-overlay"
      style={{
        content: {
          width: "80%",
          maxWidth: "600px",
          height: "auto",
          maxHeight: "80%",
          margin: "auto",
        },
      }}
    >
      <h3 className="text-xl font-semibold text-center">Compatibility Check</h3>
      <div className="mt-4 mb-1 text-center">
        {loading ? (
          <ClipLoader size={35} color={"#123abc"} loading={loading} />
        ) : (
          <div className={`font-semibold ${compatibilityMessage.includes("실패") ? "text-red-600" : "text-green-600"}`}>
            {compatibilityMessage}
          </div>
        )}
      </div>
      {compatibilityResult && (
        <div className="p-4 bg-gray-100 rounded overflow-y-auto">
          <h3 className="text-lg font-semibold ">Compatibility Result:</h3>
          <p>
            {compatibilityResult.content[0].text
              .replace("문제점이 있습니다:", "")
              .split("\n")
              .map((sentence, index) => (
                <React.Fragment key={index}>
                  {sentence.trim() && <span>{sentence.trim()}</span>}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>
      )}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          ▶ 호환성 검사
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default CompatibilityCheckModal;




//  {/* <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
//         <table className="table-auto w-full bg-white">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Part</th>
//               <th className="border px-4 py-2">Specs</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(estimate).map((partType) => {
//               const part = estimate[partType];
//               const keyFeatures = keyFeaturesMap[partType] || [];

//               return (
//                 <tr key={partType}>
//                   <td className="border px-4 py-2">{partType}</td>
//                   <td className="border px-4 py-2">
//                     {part
//                       ? keyFeatures.map(
//                           (feature) =>
//                             part[feature] && (
//                               <div key={feature}>
//                                 <strong>{feature}:</strong> {part[feature]}
//                               </div>
//                             )
//                         )
//                       : "Not Selected"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div> */}