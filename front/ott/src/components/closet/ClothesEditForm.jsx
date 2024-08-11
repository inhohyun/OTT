import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddClothesCategorySelector from './AddClothesCategorySelector'; 


const ClothesEditForm = ({
  itemDetails,
  onSave,
  onCancel,
  setItemDetails,
  categories
}) => {

  const [imageFiles, setImageFiles] = useState({
    frontImg: itemDetails.frontImg || '',
    backImg: itemDetails.backImg || '',
  });

  useEffect(() => {
    setImageFiles({
      frontImg: itemDetails.frontImg || '',
      backImg: itemDetails.backImg || '',
    });
  }, [itemDetails]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      'borderColor': state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black',
      },
      'boxShadow': state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a78bfa' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case 'MAN':
        return '남성';
      case 'WOMAN':
        return '여성';
      case 'COMMON':
        return '남녀공용';
      default:
        return '성별 없음';
    }
  };

  // 입력값 변경 처리 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prev) => ({ ...prev, [name]: value }));
  };

  // 선택값 변경 처리 함수
  const handleSelectChange = (selectedOption, name) => {
    setItemDetails((prev) => ({ ...prev, [name]: selectedOption.value }));
  };

  // 이미지 선택 처리 함수
  const handleImageSelection = (e, side) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFiles((prev) => ({ ...prev, [side]: file }));
      setItemDetails((prev) => ({ ...prev, [side]: file }));
    }
  };

  // 파일 변경 처리 함수
  const handleFileChange = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = e.target.files[0];
      setImageFiles(newImageFiles);
    }
  };

  // 이미지 삭제 함수
  const clearImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);
  };

  // 이미지 입력 요소 렌더링 함수
  const renderImageInputs = () => (
    <>
      {['frontImg', 'backImg'].map((side, index) => (
        <div key={side} className="relative">
          <label className="block text-gray-700 mb-2 text-center">
            {index === 0 ? '앞면' : '뒷면'}
          </label>
          <div
            className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById(`${side}-file-input`).click()}
          >
            {imageFiles[side] ? (
              <img
                src={
                  typeof imageFiles[side] === 'string'
                    ? imageFiles[side]
                    : URL.createObjectURL(imageFiles[side])
                }
                alt={`${side} 이미지`}
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <span className="text-gray-400">이미지 추가</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id={`${side}-file-input`}
            onChange={(e) => handleImageSelection(e, side)}
            className="hidden"
          />
          {imageFiles[side] && (
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => clearImage(index)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
            </div>
          )}
        </div>
      ))}
    </>
  );

  const matchingCategory = categories.find(
    (category) => category.name === itemDetails.category
  );

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full"
      style={{ maxHeight: '75vh', overflowY: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-4">옷 정보 수정</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">{renderImageInputs()}</div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">브랜드</label>
        <input
          type="text"
          name="brand"
          value={itemDetails.brand}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          placeholder="브랜드를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">구매처</label>
        <input
          type="text"
          name="purchase"
          value={itemDetails.purchase}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          placeholder="구매처를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">사이즈</label>
        <input
          type="text"
          name="size"
          value={itemDetails.size}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          placeholder="사이즈를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">색상</label>
        <input
          type="text"
          name="color"
          value={itemDetails.color}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg"
          placeholder="색상을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">카테고리</label>
        <AddClothesCategorySelector
          selectedCategory={matchingCategory?.categoryId || null}
          onCategoryChange={(categoryId) => 
            setItemDetails((prev) => ({ ...prev, categoryId }))
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">성별</label>
        <Select
          value={{
            value: itemDetails.gender,
            label: getGenderText(itemDetails.gender),
          }}
          onChange={(opt) => handleSelectChange(opt, 'gender')}
          options={[
            { value: 'MAN', label: '남성' },
            { value: 'WOMAN', label: '여성' },
            { value: 'COMMON', label: '남녀공용' },
          ]}
          styles={customStyles}
        />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={onSave}
          className="bg-violet-300 text-white px-4 py-2 rounded-lg"
        >
          저장
        </button>
        <button
          onClick={onCancel}
          className="bg-stone-300 text-white px-4 py-2 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ClothesEditForm;
