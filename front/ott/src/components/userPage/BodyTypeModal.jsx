// BodyTypeModal.js
import React from 'react';

const BodyTypeModal = ({ show, onClose, onSelect }) => {
  const bodyTypes = ['보통', '마른', '근육질', '통통'];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-md w-3/4 max-w-sm">
        <h3 className="text-xl mb-4">체형 선택</h3>
        <ul>
          {bodyTypes.map((type) => (
            <li key={type} className="mb-2">
              <button
                onClick={() => {
                  onSelect(type);
                  onClose();
                }}
                className="w-full text-left p-2 rounded hover:bg-gray-200"
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 w-full p-2 bg-red-500 text-white rounded">
          닫기
        </button>
      </div>
    </div>
  );
};

export default BodyTypeModal;
