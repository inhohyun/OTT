import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';
import AddClothesModal from '../../components/closet/AddClothesModal';
import ClothesDetailModal from '../../components/closet/ClothesDetailModal';
import {
  getClothesList,
  getClosetId,
  getClothesByCategory,
  getBookmarkedClothes,
  getOtherClothesList,
} from '../../api/closet/clothes';
import { getCategoryList, deleteCategory } from '../../api/closet/categories';
import useUserStore from '../../data/lookbook/userStore';
import { addClothes } from '../../api/closet/clothes';

const ClosetPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(-100);
  const [categories, setCategories] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [closetId, setClosetId] = useState(null);
  const memberId = useUserStore((state) => state.userId);
  const location = useLocation();

  const currentId = location.state?.id;

  const isMyCloset = currentId === memberId || !currentId;

  useEffect(() => {
    const initializePage = async () => {
      try {
        const sendId = currentId || memberId;
        const isMe = !currentId;

        // Closet ID와 카테고리 가져오기
        const closetResponse = await getClosetId(sendId);
        const closetId = closetResponse.data[0].id;
        setClosetId(closetId);

        const categoryList = await getCategoryList(closetId);
        const fetchedCategories = categoryList.data.map((category) => ({
          categoryId: category.categoryId,
          name: category.name,
        }));

        setCategories([
          { categoryId: -100, name: '전체' },
          { categoryId: -200, name: '즐겨찾기' },
          ...fetchedCategories,
        ]);

        // 옷 목록 가져오기
        const clothesList = isMe
          ? await getClothesList(sendId)
          : await getOtherClothesList(sendId);
        setClothes(clothesList);
      } catch (error) {
        // console.error('초기 데이터 가져오기 실패:', error);
      }
    };

    initializePage();
  }, [currentId, memberId]);

  useEffect(() => {
    if (closetId !== null) {
      const isMe = !currentId;
      fetchClothesByCategory(isMe, selectedCategory, currentId || memberId);
    }
  }, [selectedCategory, closetId, currentId, memberId]);

  const fetchClothesByCategory = async (isMe, categoryId, sendId) => {
    try {
      let clothesList;
      if (categoryId === -100) {
        // 전체
        clothesList = isMe
          ? await getClothesList(sendId)
          : await getOtherClothesList(sendId);
      } else if (categoryId === -200) {
        // 즐겨찾기
        clothesList = await getBookmarkedClothes(sendId);
      } else {
        clothesList = await getClothesByCategory(sendId, categoryId, closetId);
      }
      setClothes(clothesList);
    } catch (error) {
      // console.error('카테고리별 옷 목록 가져오기 실패:', error);
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

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      await deleteCategory(categoryToDelete.categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category.categoryId !== categoryToDelete.categoryId
        )
      );

      setClothes((prevClothes) =>
        prevClothes.map((item) =>
          item.categoryId === categoryToDelete.categoryId
            ? { ...item, categoryId: -100 }
            : item
        )
      );

      // console.log(`${categoryToDelete.name} 카테고리 삭제 완료`);
    } catch (error) {
      // console.error('카테고리 삭제 중 에러 발생:', error);
    }
  };

  const handleNewClothes = async (newClothesData) => {
    try {
      const response = await addClothes(newClothesData);

      if (
        typeof response === 'string' &&
        response.includes('옷 저장을 완료했습니다')
      ) {
        const updatedClothesList = await getClothesList(memberId);

        const newItem = updatedClothesList[updatedClothesList.length - 1];
        newItem.key = newItem.clothesId;

        setClothes(updatedClothesList);
      } else {
        // console.error('Unexpected response format:', response);
      }
    } catch (error) {
      // console.error('Error adding clothes:', error);
    }
  };

  const handleToggleLike = (id) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleClothesClick = (clothingItem) => {
    // console.log(clothingItem.clothesId);
    setSelectedClothing(clothingItem);
    setIsDetailModalOpen(true);
  };

  const handleEditClothes = (updatedClothes) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === updatedClothes.id ? updatedClothes : item
      )
    );

    setSelectedClothing(updatedClothes);
  };

  const filteredCategories = categories.filter(
    (category) => category.name !== '전체' && category.name !== '즐겨찾기'
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
        closetId={closetId}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />
      <ClothesGrid
        clothes={clothes}
        setClothes={setClothes}
        onToggleLike={handleToggleLike}
        onClothesClick={handleClothesClick}
        currentId={currentId}
      />
      {isMyCloset && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
            style={{ width: '200px' }}
          >
            + 옷 추가하기
          </button>
        </div>
      )}
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
          onEdit={handleEditClothes}
          categories={filteredCategories}
          setClothes={setClothes}
          memberId={memberId}
          setCategories={setCategories}
        />
      )}
    </div>
  );
};

export default ClosetPage;
