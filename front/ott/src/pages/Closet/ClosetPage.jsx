import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';
import AddClothesModal from '../../components/closet/AddClothesModal';
import ClothesDetailModal from '../../components/closet/ClothesDetailModal';
import clothesData from './clothesData.js';

const ClosetPage = () => {
  // 카테고리 기본 설정값 === 전체
  const [selectedCategory, setSelectedCategory] = useState('전체');
  // 더미데이터 가져오기
  const [clothes, setClothes] = useState(clothesData);
  // 기본으로 정의되는 카테고리들 6개
  const [categories, setCategories] = useState([
    '전체',
    '상의',
    '하의',
    '아우터',
    '한벌옷',
    '즐겨찾기',
  ]);
  // 옷 추가 모달 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // 옷 상세정보 모달 상태
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  // 수정하고자 하는 옷 선택
  const [selectedClothing, setSelectedClothing] = useState(null);

  // 옷의 카테고리 변경
  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  // 카테고리 추가
  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // 카테고리 이름 수정
  const handleEditCategory = (oldCategory, newCategoryName) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category === oldCategory ? newCategoryName : category
      )
    );
    // 카테고리 이름 바꿨을 때 새로운 이름으로 옷의 카테고리 변경
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.category === oldCategory
          ? { ...item, category: newCategoryName }
          : item
      )
    );
  };

  // 카테고리 삭제
  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );
    // 삭제된 카테고리의 옷들 -> 카테고리 전체로 변경
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.category === categoryToDelete ? { ...item, category: '전체' } : item
      )
    );
  };

  // 옷 추가
  const handleAddClothes = (newClothes) => {
    setClothes([...clothes, newClothes]);
    if (!categories.includes(newClothes.category)) {
      setCategories([...categories, newClothes.category]);
    }
  };

  // 옷의 즐겨찾기 토글
  const handleToggleLike = (id) => {
    setClothes(
      clothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  // 옷 사진 눌렀을 때 옷 상세정보 모달 띄우기
  const handleClothesClick = (clothingItem) => {
    setSelectedClothing(clothingItem);
    setIsDetailModalOpen(true);
  };

  // 옷 상세정보 수정
  const handleEditClothes = (updatedClothing) => {
    setClothes(
      clothes.map((item) =>
        item.id === updatedClothing.id ? updatedClothing : item
      )
    );
    setIsDetailModalOpen(false);
  };

  // 옷 삭제
  const handleDeleteClothes = (id) => {
    setClothes(clothes.filter((item) => item.id !== id));
    setIsDetailModalOpen(false);
  };

  // 카테고리별로 옷 분류
  const filteredClothes =
    selectedCategory === '전체'
      ? clothes
      : selectedCategory === '즐겨찾기'
      ? clothes.filter((item) => item.isLiked)
      : clothes.filter((item) => item.category === selectedCategory);

  // '전체', '즐겨찾기' 제외한 나머지 카테고리들
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
