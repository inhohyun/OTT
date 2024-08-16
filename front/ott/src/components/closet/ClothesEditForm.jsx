import Select from 'react-select';
import AddClothesCategorySelector from './AddClothesCategorySelector';

const ClothesEditForm = ({ itemDetails, onSave, onCancel, setItemDetails }) => {
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

  // 드롭다운 변경값 저장 함수
  const handleSelectChange = (selectedOption, name) => {
    setItemDetails((prev) => ({ ...prev, [name]: selectedOption.value }));
  };

  // 카테고리 선택
  const handleCategoryChange = (newCategoryId) => {
    setItemDetails((prev) => ({
      ...prev,
      newCategoryId,
    }));
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full"
      style={{ maxHeight: '75vh', overflowY: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-4">옷 정보 수정</h2>

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
          selectedCategory={itemDetails.newCategoryId || itemDetails.categoryId}
          onCategoryChange={handleCategoryChange}
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
