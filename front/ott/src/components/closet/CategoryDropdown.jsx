import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './AddCategory'; // Adjust the import path as needed

const CategoryDropdown = ({ selectedCategory, onCategoryChange, categories, onAddCategory }) => {
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
    onAddCategory(newCategory);
  };

  return (
    <div className="my-12 w-full max-w-xs flex items-center">
      <Select
        options={categories.map(category => ({ value: category, label: category }))}
        value={{ value: selectedCategory, label: selectedCategory }}
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
      />
    </div>
  );
};

export default CategoryDropdown;
