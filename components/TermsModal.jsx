// /app/components/TermsModal.tsx
import { useState } from "react";

export default function TermsModal({ isOpen, onClose, onAgree }) {
  const [personalInfoAgreed, setPersonalInfoAgreed] = useState(false);
  const [emailAlertAgreed, setEmailAlertAgreed] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);

  const isFormValid = personalInfoAgreed && emailAlertAgreed;

  const handleDetails = (details) => {
    setViewDetails(details);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">SPOID 서비스 이용 약관 </h2>
        {!viewDetails ? (
          <>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={personalInfoAgreed}
                  onChange={(e) => setPersonalInfoAgreed(e.target.checked)}
                />
                개인정보 수집 동의 (이름, 이메일)
                <button
                  className="ml-auto text-blue-600 text-sm"
                  onClick={() => handleDetails("personal-info")}
                >
                  자세히
                </button>
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={emailAlertAgreed}
                  onChange={(e) => setEmailAlertAgreed(e.target.checked)}
                />
                이메일 알람 수신 동의
                <button
                  className="ml-auto text-blue-600 text-sm"
                  onClick={() => handleDetails("email-alert")}
                >
                  자세히
                </button>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md"
                onClick={onClose}
              >
                취소
              </button>
              <button
                className={`py-2 px-4 rounded-md text-white ${isFormValid ? "bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
                disabled={!isFormValid}
                onClick={onAgree}
              >
                동의하고 진행
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-700">
            {viewDetails === "personal-info" && (
              <>
                <h3 className="text-lg font-semibold mb-2">
                  개인정보 수집 동의
                </h3>
                <p>
                  이메일과 이름을 수집하며, 이 정보는 오직 다음의목적으로
                  사용됩니다:
                </p>
                <ul className="list-disc ml-4 mt-2">
                  <li>계정 생성 및 관리</li>
                  <li>고객 지원 제공</li>
                  <li>서비스 관련 알림 전송</li>
                </ul>
                <p className="mt-2">
                  <strong>
                    개인정보는 서비스 운영 외 다른 목적으로 절대 사용되지
                    않습니다.
                  </strong>
                </p>
                <button
                  className="mt-4 text-blue-600"
                  onClick={() => setViewDetails(null)}
                >
                  돌아가기
                </button>
              </>
            )}
            {viewDetails === "email-alert" && (
              <>
                <h3 className="text-lg font-semibold mb-2">
                  이메일 알람 수신 동의
                </h3>
                <p>
                  주기적으로 부품 가격 변동과 관련된 알람을 이메일로
                  보내드립니다. 구독하지 않을 경우 이메일이 발송되지 않습니다.
                </p>
                <ul className="list-disc ml-4 mt-2">
                  <li>일일 부품 가격 알림</li>
                </ul>

                <button
                  className="mt-4 text-blue-600"
                  onClick={() => setViewDetails(null)}
                >
                  돌아가기
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
