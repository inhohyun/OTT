import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BodyTypeModal = ({ show, onClose, onSelect, selectedBodyType }) => {
  const bodyTypes = ['슬림', '슬림 탄탄', '보통', '통통'];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-2xl shadow-md w-3/4 max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">체형</h3>
          <button onClick={onClose} className="text-gray-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {bodyTypes.map((type) => (
            <div
              key={type}
              onClick={() => {
                onSelect(type);
                onClose();
              }}
              className={`cursor-pointer p-4 rounded-lg border text-center text-stone-400 ${
                selectedBodyType === type ? 'bg-violet-200' : ''
              }`}
            >
              <div className="w-8 h-8 bg-purple-100 rounded-full mb-2 mx-auto"></div>
              <span className="text-sm">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyTypeModal;
