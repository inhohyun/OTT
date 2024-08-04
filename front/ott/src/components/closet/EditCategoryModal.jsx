import React, { useState } from 'react';

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [newCategoryName, setNewCategoryName] = useState(category);

  const handleSave = () => {
    onSave(newCategoryName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">카테고리 이름 바꾸기</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-violet-300 text-white rounded"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
