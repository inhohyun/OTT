import React, { useState } from 'react';
import { fixCategory } from '../../api/closet/categories';

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
  onSave,
  existingCategories,
  closetId,
}) => {
  // 새로운 카테고리 이름을 저장할 상태와 오류 메시지 상태
  const [newCategoryName, setNewCategoryName] = useState(category.name);
  const [error, setError] = useState('');

  // 저장 버튼 클릭 시 호출되는 함수
  const handleSave = async () => {
    // 새로운 카테고리 이름의 앞뒤 공백 제거
    const trimmedName = newCategoryName.trim();

    // 중복 카테고리 이름 검사, 현재 편집 중인 카테고리는 제외
    if (
      existingCategories.some(
        (existingCategory) =>
          existingCategory.name.toLowerCase() === trimmedName.toLowerCase() &&
          existingCategory.id !== category.categoryId
      )
    ) {
      setError('같은 이름의 카테고리가 이미 존재합니다.');
      return;
    }

    try {
      // API 호출하여 카테고리 수정
      await fixCategory(closetId, category.categoryId, trimmedName);
      // 저장 성공 시 상위 컴포넌트에 변경 사항 전달
      onSave(trimmedName);
      onClose();
    } catch (error) {
      console.error('카테고리 수정 중 오류 발생:', error);
      setError('카테고리 수정 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">카테고리 이름 바꾸기</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => {
            setNewCategoryName(e.target.value);
            setError(''); // 입력 변경 시 오류 메시지 초기화
          }}
          className={`border rounded px-2 py-1 w-full mb-4 ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
