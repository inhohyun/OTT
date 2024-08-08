import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddCategory from './AddCategory';
import EditCategoryModal from './EditCategoryModal';
import {
  getCategoryList,
  fixCategory,
  addCategory,
  deleteCategory,
} from '../../api/closet/categories';
import { getClosetId } from '../../api/closet/clothes';


const CategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}) => {
  // 카테고리 목록 상태
  const [categories, setCategories] = useState([]);
  // 카테고리 추가 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 카테고리 수정 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // 수정 상태인 카테고리
  const [editingCategory, setEditingCategory] = useState(null);
  // 옷장 ID
  const [closetId, setClosetId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const memberId = 1;
        const closetResponse = await getClosetId(memberId);
        console.log(closetResponse)
        const closetId = closetResponse.data.data[0].id;
        console.log(closetId);
        setClosetId(closetId)
        const categoryList = await getCategoryList(closetId);
        console.log(categoryList);
        setCategories(categoryList.data);
      } catch (error) {
        console.error('카테고리 목록 불러오는 중 오류 발생:', error);
      }
    };

    fetchCategories();
  }, []);

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

  // 카테고리 추가 함수
  const handleAddCategory = (newCategory) => {
    onAddCategory(newCategory);
  };

  // 카테고리 삭제 함수
  const handleDeleteCategory = (category, e) => {
    e.stopPropagation(); // 드롭다운 닫힘 방지
    if (window.confirm(`정말 "${category}" 카테고리를 삭제하시겠습니까?`)) {
      onDeleteCategory(category);
    }
  };

  // 수정하고자 하는 카테고리 클릭
  const handleEditCategoryClick = (category, e) => {
    e.stopPropagation();
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  // 수정한 카테고리 저장
  const handleEditCategorySave = (newCategoryName) => {
    onEditCategory(editingCategory, newCategoryName);
    setEditingCategory(null); // 수정하는 카테고리 선택 초기화
    setIsEditModalOpen(false);
  };

  // 카테고리 수정 취소
  const handleEditCategoryCancel = () => {
    setEditingCategory(null); // 수정 중 모달 껐을 경우 수정되는 카테고리 선택 초기화
    setIsEditModalOpen(false);
  };

  return (
    <div className="my-12 w-full max-w-xs flex items-center">
      <Select
        options={categories.map((category) => ({
          value: category.id,
          label: (
            <div className="flex justify-between items-center w-full">
              <span className="flex-grow">{category.name}</span>
              {category.name !== '전체' && category.name !== '즐겨찾기' && (
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
        value={categories.find((cat) => cat.id === selectedCategory) ? { value: selectedCategory, label: categories.find((cat) => cat.id === selectedCategory).name } : null}
        onChange={(option) => onCategoryChange(option.value)}
        styles={customStyles}
        className="flex-grow"
      />
      <div onClick={() => setIsModalOpen(true)} className="ml-6 p-2 rounded-lg cursor-pointer">
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </div>
      <AddCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
        existingCategories={categories}
        closetId={closetId}
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
