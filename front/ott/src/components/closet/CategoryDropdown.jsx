import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './AddCategory'; // Adjust the import path as needed

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([
    { value: '전체', label: '전체' },
    { value: '상의', label: '상의' },
    { value: '하의', label: '하의' },
    { value: '아우터', label: '아우터' },
    { value: '한벌옷', label: '한벌옷' },
    { value: '즐겨찾기', label: '즐겨찾기' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black', // Border color when hovering
      },
      boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow, // Remove blue shadow
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a78bfa' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const handleAddCategory = (newCategory) => {
    const newCategoryObj = { value: newCategory, label: newCategory };
    setCategories([...categories, newCategoryObj]);
  };

  return (
    <div className="my-8 w-full max-w-xs flex items-center">
      <Select
        options={categories}
        value={categories.find(category => category.value === selectedCategory) || { value: '전체', label: '전체' }}
        onChange={(option) => onCategoryChange(option.value)}
        styles={customStyles}
        className="flex-grow"
      />
      <div
        onClick={() => setIsModalOpen(true)}
        className="ml-6 p-2 rounded-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </div>
      <AddCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
        existingCategories={categories}
      />
    </div>
  );
};

export default CategoryDropdown;
