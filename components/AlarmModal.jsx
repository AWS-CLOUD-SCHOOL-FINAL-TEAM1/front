import React from "react";
import Modal from "react-modal";

const AlarmModal = ({ isOpen, onClose, onConfirm, isAlarmEnabled }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={isAlarmEnabled ? "알림 비활성화 확인" : "알림 활성화 확인"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isAlarmEnabled ? "알림 비활성화 확인" : "알림 활성화 확인"}
      </h2>
      <p>
        {isAlarmEnabled ? "알람을 해제하시겠습니까?" : "알람을 받으시겠습니까?"}
      </p>
      <div className="flex justify-end mt-4">
        <button
          className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default AlarmModal;
