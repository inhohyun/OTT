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
  useEffect(() => {
    const fetchInitialClothesList = async () => {
      try {
        const clothesList = await getClothesList(memberId);
        setClothes(clothesList);
      } catch (error) {
        console.error('옷 목록 가져오기 실패:', error);
      }
    };

    fetchInitialClothesList();
  }, [memberId]);

  useEffect(() => {
    const fetchClosetIdAndCategories = async () => {
      try {
        const closetResponse = await getClosetId(memberId);
        console.log('closetResponse', closetResponse);
        const closetId = closetResponse.data[0].id;
        setClosetId(closetId);

        const categoryList = await getCategoryList(closetResponse.data[0].id);
        console.log('categoryList', categoryList);
        const fetchedCategories = categoryList.data.map((category) => ({
          categoryId: category.categoryId,
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

    fetchClosetIdAndCategories();
  }, [memberId]);

  useEffect(() => {
    if (closetId !== null) {
      fetchClothesByCategory(selectedCategory);
    }
  }, [selectedCategory, closetId]);

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

  const handleNewClothes = async (newClothesData) => {
    try {
      const response = await addClothes(newClothesData);

      if (response && response.clothesId) {
        // 응답으로부터 새로운 옷 아이템을 직접 생성
        const newItem = {
          ...newClothesData,
          id: response.clothesId,
          key: response.clothesId, // 키로 사용
          isLiked: false, // 초기 상태 설정
        };

        // 기존 clothes 상태에 새로운 아이템을 추가
        setClothes((prevClothes) => [...prevClothes, newItem]);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error adding clothes:', error);
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
    console.log(clothingItem.clothesId);
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
