import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const AddCategory = ({
  isOpen,
  onClose,
  onAddCategory,
  existingCategories = [],
}) => {
  // 새로 추가되는 카테고리 초기값 공백으로 정의
  const [newCategory, setNewCategory] = useState('');
  // 관련된 에러 정의
  const [error, setError] = useState('');

  // 카테고리 추가 함수
  const handleAddCategory = () => {
    // 공백 제외한 카테고리 이름
    const trimmedCategory = newCategory.trim();
    // 입력값 없을 경우
    if (!trimmedCategory) {
      setError('카테고리 이름을 입력하세요');
      return;
    }

    // 카테고리 중복 검사
    const categoryExists = existingCategories.some(
      (category) => category.toLowerCase() === trimmedCategory.toLowerCase()
    );
    // 같은 이름의 카테고리 존재할 경우
    if (categoryExists) {
      setError('같은 이름의 카테고리가 존재합니다');
      return;
    }

    // 검사 통과한 카테고리 추가
    onAddCategory(trimmedCategory);
    // 입력값 초기화
    setNewCategory('');
    // 카테고리 추가 모달 닫기
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2 className="text-xl font-bold mb-4 text-center">카테고리 추가하기</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg mb-4 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder="추가할 카테고리를 입력하세요"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setError(''); 
          }}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-center">
          <button
            onClick={handleAddCategory}
            className="w-64 p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> 추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
