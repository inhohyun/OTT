import { useState, useEffect } from 'react';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';
import AddClothesModal from '../../components/closet/AddClothesModal';
import ClothesDetailModal from '../../components/closet/ClothesDetailModal'; // Comment out import if not using
import {
  getClothesList,
  getClosetId,
  getClothesByCategory,
  getBookmarkedClothes,
} from '../../api/closet/clothes';
import { getCategoryList } from '../../api/closet/categories';
import { useUserStore } from '@/data/lookbook/userStore';
const ClosetPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(-100);
  const [categories, setCategories] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [closetId, setClosetId] = useState(null);
  const memberId = useUserStore((state) => state.userId);
  useEffect(() => {
    fetchClosetIdAndCategories();
  }, []);

  useEffect(() => {
    if (closetId !== null) {
      fetchClothesByCategory(selectedCategory);
    }
  }, [selectedCategory, closetId]);

  const fetchClosetIdAndCategories = async () => {
    console.log('옷장 페이지에서의 memberId:', memberId);
    try {
      const closetResponse = await getClosetId(memberId);
      const closetId = closetResponse.data.data[0].id;
      setClosetId(closetId);

      const categoryList = await getCategoryList(1);
      const fetchedCategories = categoryList.data.map((category) => ({
        categoryId: category.id,
        name: category.name,
      }));
      setCategories([
        { categoryId: -100, name: '전체' },
        { categoryId: -200, name: '즐겨찾기' },
        ...fetchedCategories,
      ]);
    } catch (error) {
      console.error('카테고리 목록 가져오기 실패:', error);
    }
  };

  const fetchClothesByCategory = async (categoryId) => {
    try {
      let clothesList;
      if (categoryId === -100) {
        // 전체
        clothesList = await getClothesList(memberId);
      } else if (categoryId === -200) {
        // 즐겨찾기
        clothesList = await getBookmarkedClothes(memberId);
      } else {
        clothesList = await getClothesByCategory(
          memberId,
          categoryId,
          closetId
        );
      }
      setClothes(clothesList);
    } catch (error) {
      console.error('옷 목록 가져오기 실패', error);
    }
  };

  const handleCategoryChange = (newCategoryId) => {
    setSelectedCategory(newCategoryId);
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

  const handleNewClothes = (newClothes) => {
    setClothes((prevClothes) => [...prevClothes, newClothes]);
    fetchClothesByCategory(selectedCategory);
  };

  const handleToggleLike = (id) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleClothesClick = (clothingItem) => {
    setSelectedClothing(clothingItem);
    setIsDetailModalOpen(true);
  };

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
        clothes={clothes}
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
        onAddClothes={handleNewClothes}
        categories={categories.filter(
          (category) => category !== '전체' && category !== '즐겨찾기'
        )}
      />

      {selectedClothing && (
        <ClothesDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          clothingItem={selectedClothing}
          // onEdit={handleEditClothes}
          // onDelete={handleDeleteClothes}
          categories={filteredCategories}
        />
      )}
    </div>
  );
};

export default ClosetPage;
