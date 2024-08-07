import React from 'react';

const ToggleButton = ({ isPublic, setIsPublic, handleSave, buttonLabel }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex items-center">
        <div
          className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            isPublic ? 'bg-violet-300' : 'bg-stone-300'
          }`}
          onClick={() => setIsPublic(!isPublic)}
        >
          <div
            className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
              isPublic ? 'transform translate-x-6' : ''
            }`}
          ></div>
        </div>
        <span className="ml-3 text-sm">{isPublic ? '공개' : '비공개'}</span>
      </div>
      <button
        className="bg-violet-300 text-white py-2 px-4 rounded hover:bg-violet-500 transition"
        onClick={handleSave}
        style={{ fontFamily: 'dohyeon' }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ToggleButton;
