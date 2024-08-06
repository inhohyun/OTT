import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';
import AddClothesModal from '../../components/closet/AddClothesModal';
import ClothesDetailModal from '../../components/closet/ClothesDetailModal';
import clothesData from './clothesData.js';

const ClosetPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [clothes, setClothes] = useState(clothesData);
  const [categories, setCategories] = useState([
    '전체',
    '상의',
    '하의',
    '아우터',
    '한벌옷',
    '즐겨찾기',
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleEditCategory = (oldCategory, newCategoryName) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category === oldCategory ? newCategoryName : category
      )
    );
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.category === oldCategory
          ? { ...item, category: newCategoryName }
          : item
      )
    );
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.category === categoryToDelete
          ? { ...item, category: '전체' }
          : item
      )
    );
  };

  const handleAddClothes = (newClothes) => {
    setClothes([...clothes, newClothes]);
    if (!categories.includes(newClothes.category)) {
      setCategories([...categories, newClothes.category]);
    }
  };

  const handleToggleLike = (id) => {
    setClothes(
      clothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleClothesClick = (clothingItem) => {
    setSelectedClothing(clothingItem);
    setIsDetailModalOpen(true);
  };

  const handleEditClothes = (updatedClothing) => {
    setClothes(
      clothes.map((item) =>
        item.id === updatedClothing.id ? updatedClothing : item
      )
    );
    // setIsDetailModalOpen(false);
  };

  const handleDeleteClothes = (id) => {
    setClothes(clothes.filter((item) => item.id !== id));
    setIsDetailModalOpen(false);
  };

  const filteredClothes =
    selectedCategory === '전체'
      ? clothes
      : selectedCategory === '즐겨찾기'
        ? clothes.filter((item) => item.isLiked)
        : clothes.filter((item) => item.category === selectedCategory);

  const filteredCategories = categories.filter(
    (category) => category !== '전체' && category !== '즐겨찾기'
  );

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover pb-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <CategoryDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />
      <ClothesGrid
        clothes={filteredClothes}
        onToggleLike={handleToggleLike}
        onClothesClick={handleClothesClick}
      />
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
          style={{ width: '200px' }}
        >
          + 옷 추가하기
        </button>
      </div>
      <AddClothesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddClothes={handleAddClothes}
        categories={filteredCategories}
      />
      {selectedClothing && (
        <ClothesDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          clothingItem={selectedClothing}
          onEdit={handleEditClothes}
          onDelete={handleDeleteClothes}
          categories={filteredCategories}
        />
      )}
    </div>
  );
};

export default ClosetPage;
