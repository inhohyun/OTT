import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './AddCategory';
import EditCategoryModal from './EditCategoryModal';

const CategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
  };

  const handleAddCategory = (newCategory) => {
    onAddCategory(newCategory);
  };

  const handleDeleteCategory = (category, e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    if (window.confirm(`정말 "${category}" 카테고리를 삭제하시겠습니까?`)) {
      onDeleteCategory(category);
    }
  };

  const handleEditCategoryClick = (category, e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleEditCategorySave = (newCategoryName) => {
    onEditCategory(editingCategory, newCategoryName);
    setEditingCategory(null); // Reset after save
    setIsEditModalOpen(false);
  };

  const handleEditCategoryCancel = () => {
    setEditingCategory(null); // Reset when modal is closed without saving
    setIsEditModalOpen(false);
  };

  return (
    <div className="my-12 w-full max-w-xs flex items-center">
      <Select
        options={categories.map((category) => ({
          value: category,
          label: (
            <div className="flex justify-between items-center w-full">
              <span className="flex-grow">{category}</span>
              {(category !== '전체' && category !== '즐겨찾기') && (
                <div className="flex space-x-2 ml-auto">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={(e) => handleEditCategoryClick(category, e)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={(e) => handleDeleteCategory(category, e)}
                  />
                </div>
              )}
            </div>
          ),
        }))}
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
        existingCategories={categories}
      />
      {editingCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={handleEditCategoryCancel}
          category={editingCategory}
          onSave={handleEditCategorySave}
          existingCategories={categories}
        />
      )}
    </div>
  );
};

export default CategoryDropdown;
