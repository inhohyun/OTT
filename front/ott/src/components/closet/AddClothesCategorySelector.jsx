import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getCategoryList } from '../../api/closet/categories';
import { getClosetId } from '../../api/closet/clothes';
import useUserStore from '../../data/lookbook/userStore';

const AddClothesCategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [closetId, setClosetId] = useState(null);

  const memberId = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const memberId = 1;
        const closetResponse = await getClosetId(memberId);
        console.log('memberId', memberId);
        const closetid = closetResponse.data[0].id;
        setClosetId(closetid);
        const categoryList = await getCategoryList(closetId);
        console.log('[*]카테고리 목록', categoryList.data);
        setCategories(categoryList.data);
      } catch (error) {
        console.error('카테고리 목록 조회 실패:', error);
      }
    };
    fetchCategories();
  }, [closetId]);
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
  };

  const handleCategoryChange = (selectedOption) => {
    console.log(selectedOption);
    onCategoryChange(selectedOption.value);
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        options={categories.map((category) => ({
          value: category.categoryId,
          label: category.name,
        }))}
        value={
          selectedCategory
            ? {
                value: selectedCategory,
                label: categories.find(
                  (cat) => cat.categoryId === selectedCategory
                )?.name,
              }
            : null
        }
        onChange={handleCategoryChange}
        styles={customStyles}
        className="flex-grow"
        placeholder="카테고리 선택"
      />
    </div>
  );
};

export default AddClothesCategorySelector;
