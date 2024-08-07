import React from 'react';

const Modal = ({ isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 mb-8"
      onClick={onClose} // Close modal when clicking the overlay
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white rounded-lg p-6 z-10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="text-sm py-3 rounded-lg bg-violet-300 text-white me-2 w-full"
          style={{ fontFamily: 'dohyeon' }}
          onClick={onEdit}
        >
          룩북 수정
        </button>
        <button
          className="text-sm py-3 rounded-lg bg-violet-300 text-white w-full mt-2"
          style={{ fontFamily: 'dohyeon' }}
          onClick={onDelete}
        >
          룩북 삭제
        </button>
        <button
          className="text-sm py-3 rounded-lg bg-gray-300 text-black w-full mt-2"
          style={{ fontFamily: 'dohyeon' }}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
