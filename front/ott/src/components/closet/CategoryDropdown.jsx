import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './AddCategory'; // Adjust the import path as needed

const CategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingCategory !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCategory]);

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

  const startEditingCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  const handleCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const saveCategoryName = () => {
    if (newCategoryName.trim()) {
      onEditCategory(editingCategory, newCategoryName.trim());
      setEditingCategory(null);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
      onDeleteCategory(category);
    }
  };

  return (
    <div className="my-12 w-full max-w-xs flex items-center">
      <Select
        options={categories.map((category) => ({
          value: category,
          label: (
            <div className="flex justify-between items-center w-full">
              {editingCategory === category ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={newCategoryName}
                  onChange={handleCategoryNameChange}
                  onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                  className="flex-grow border border-gray-300 rounded px-1 py-1 mr-2"
                  style={{ marginRight: '8px' }}
                />
              ) : (
                <span className="flex-grow">{category}</span>
              )}
              {(category !== '전체' && category !== '즐겨찾기') && (
                <div className="flex space-x-2 ml-auto">
                  {editingCategory === category ? (
                    <FontAwesomeIcon
                      icon={faSave}
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveCategoryName();
                      }}
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingCategory(category);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category);
                        }}
                      />
                    </>
                  )}
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
      />
    </div>
  );
};

export default CategoryDropdown;
