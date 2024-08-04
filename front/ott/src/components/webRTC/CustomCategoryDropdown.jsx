import Select from 'react-select';

// 기본 카테고리 리스트
const DEFAULT_CATEGORIES = [
  '전체',
  '상의',
  '하의',
  '아우터',
  '한벌옷',
  '즐겨찾기',
];

const CustomCategoryDropdown = ({
  selectedCategory, // 현재 선택된 카테고리
  onCategoryChange, // 카테고리 변경
  categories = DEFAULT_CATEGORIES, // 기본 카테고리 리스트를 사용
}) => {
  // 스타일 커스터마이징
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

  return (
    <div className="my-12 w-full max-w-xs flex items-center">
      <Select
        options={categories.map((category) => ({
          value: category,
          label: category,
        }))}
        value={{ value: selectedCategory, label: selectedCategory }} // 현재 선택된 카테고리 값
        onChange={(option) => onCategoryChange(option.value)} // 카테고리 변경 시 호출되는 핸들러
        styles={customStyles} // 커스터마이징된 스타일 적용
        className="flex-grow"
      />
    </div>
  );
};

export default CustomCategoryDropdown;
