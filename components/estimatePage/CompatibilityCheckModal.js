import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth";
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
  const [hasCheckedCompatibility, setHasCheckedCompatibility] = useState(false);
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

      // Set hasCheckedCompatibility to true after the check is completed
      setHasCheckedCompatibility(true);
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
    setHasCheckedCompatibility(false); // Reset the check state when the modal is closed
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
          maxHeight: "80%", // Max height for the modal
          overflow: "auto", // Ensure scrolling for the content
          margin: "auto",
        },
      }}
    >
      <h3 className="text-xl font-semibold text-center">Compatibility Check</h3>
      <div className="mt-4 mb-1 text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mt-2 text-2xl font-bold text-gray-700">
              {"s p o i d".split(" ").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </div>
            <br />
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <br />
            <div className="mt-2 text-gray-600">
              <strong>부품 간 호환성 검사 중입니다.</strong>
            </div>
            <br />
          </div>
        ) : (
          <div
            className={`font-semibold ${
              compatibilityMessage.includes("실패")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {compatibilityMessage}
          </div>
        )}
      </div>
      {compatibilityResult && (
        <div
          className="p-4 bg-gray-100 rounded"
          style={{ maxHeight: "50vh", overflowY: "auto" }} // Ensuring max height for content and scroll
        >
          <div>
            {compatibilityResult.content[0].text
              .split("\n")
              .map((sentence, index) => {
                let displayText = sentence.trim();
                if (displayText.includes("문제 원인:")) {
                  displayText = `⚠️ ${displayText}`;
                } else if (displayText.includes("솔루션:")) {
                  displayText = `💡 ${displayText}`;
                } else if (displayText.includes("전체적인 의견:")) {
                  displayText = `📋 ${displayText}`;
                }
                return (
                  <React.Fragment key={index}>
                    {displayText && <span>{displayText}</span>}
                    <br />
                  </React.Fragment>
                );
              })}
            <br></br>

            <p className="px-4 py-2  text-blue-500 font-semibold">
              * 상기 레포트는 AI 분석 결과이므로, 참고용으로만 사용하기
              바랍니다.
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center space-x-4 mt-4">
        {!hasCheckedCompatibility && (
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
            ▶ 호환성 검사
          </button>
        )}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>

      <style>{`
        .spinner {
          width: 44.8px;
          height: 44.8px;
          animation: spinner-y0fdc1 2s infinite ease;
          transform-style: preserve-3d;
        }
        .spinner > div {
          background-color: rgba(71, 75, 255, 0.2);
          height: 100%;
          position: absolute;
          width: 100%;
          border: 2.2px solid #474bff;
        }
        .spinner div:nth-of-type(1) {
          transform: translateZ(-22.4px) rotateY(180deg);
        }
        .spinner div:nth-of-type(2) {
          transform: rotateY(-270deg) translateX(50%);
          transform-origin: top right;
        }
        .spinner div:nth-of-type(3) {
          transform: rotateY(270deg) translateX(-50%);
          transform-origin: center left;
        }
        .spinner div:nth-of-type(4) {
          transform: rotateX(90deg) translateY(-50%);
          transform-origin: top center;
        }
        .spinner div:nth-of-type(5) {
          transform: rotateX(-90deg) translateY(50%);
          transform-origin: bottom center;
        }
        .spinner div:nth-of-type(6) {
          transform: translateZ(22.4px);
        }
        @keyframes spinner-y0fdc1 {
          0% {
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
          }
          50% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
          }
          100% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
          }
        }
      `}</style>
    </Modal>
  );
};

export default CompatibilityCheckModal;
