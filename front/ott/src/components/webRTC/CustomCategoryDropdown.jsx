import Select from 'react-select';

const DEFAULT_CATEGORIES = [
  '전체',
  '상의',
  '하의',
  '아우터',
  '한벌옷',
  '즐겨찾기',
];

const CustomCategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
  categories = DEFAULT_CATEGORIES, // Default to the predefined categories
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      'borderColor': state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black', // Border color when hovering
      },
      'boxShadow': state.isFocused ? '0 0 0 1px black' : provided.boxShadow, // Remove blue shadow
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
        value={{ value: selectedCategory, label: selectedCategory }}
        onChange={(option) => onCategoryChange(option.value)}
        styles={customStyles}
        className="flex-grow"
      />
    </div>
  );
};

export default CustomCategoryDropdown;
