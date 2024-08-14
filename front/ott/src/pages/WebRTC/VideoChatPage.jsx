import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VideoSpace from '../../components/webRTC/video/VideoSpace';
import CustomClothesGrid from '../../components/webRTC/CustomClothesGrid';
import CustomCategoryDropdown from '../../components/webRTC/CustomCategoryDropdown';
import backgroundImage from '../../assets/images/background_image_main.png';
import ClothesDetailModal from '../../components/closet/ClothesDetailModal'; // Comment out import if not using
import { useLocation } from 'react-router-dom';
import {
  getClothesList,
  getClosetId,
  getClothesByCategory,
  getBookmarkedClothes,
} from '../../api/closet/clothes';
import { getCategoryList } from '../../api/closet/categories';
import { getUserInfo } from '../../api/user/user';

const VideoChatPage = () => {
  const location = useLocation();
  const { otherMemberId } = location.state;

  // URL에서 username을 추출
  // const { username } = useParams();
  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState(-100);
  const [categories, setCategories] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [closetId, setClosetId] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [otherUserInfo, setOtherUserInfo] = useState(null);

  // 옷 데이터 상태

  // 선택된 카테고리와 옷 데이터를 console에 출력
  useEffect(() => {
    const fetchClosetIdAndCategories = async () => {
      try {
        const otherUserInfoResponse = await getUserInfo(otherMemberId);
        setOtherUserInfo(otherUserInfoResponse.data);
        const closetResponse = await getClosetId(otherMemberId);
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
  }, [otherMemberId]);

  // 카테고리 변경
  const handleCategoryChange = (newCategory) => {
    // 선택된 카테고리 업데이트
    setSelectedCategory(newCategory);
  };

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
        clothesList = await getClothesList(otherMemberId);
      } else if (categoryId === -200) {
        // 즐겨찾기
        clothesList = await getBookmarkedClothes(otherMemberId);
      } else {
        clothesList = await getClothesByCategory(
          otherMemberId,
          categoryId,
          closetId
        );
      }
      setClothes(clothesList);
    } catch (error) {
      console.error('옷 목록 가져오기 실패', error);
    }
  };

  const handleClothesClick = (clothingItem) => {
    console.log(clothingItem.clothesId);
    setSelectedClothing(clothingItem);
    setIsDetailModalOpen(true);
  };

  // 좋아요 상태 토글
  const handleToggleLike = (id) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex-grow flex items-center justify-center h-1/3">
        <VideoSpace /> {/* 화상 채팅 공간 */}
      </div>
      <div className="flex-grow h-2/3">
        <div className="text-center my-2">
          <h2 className="text-xl font-bold mb-2">{otherUserInfo.nickname}님의 옷장</h2>{' '}
          {/* 사용자 이름 표시 */}
          <div className="flex justify-center mt-[-5%]">
            <CustomCategoryDropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={categories}
              closetId={closetId}
            />
          </div>
        </div>
        <div className="mt-[-5%]">
          <CustomClothesGrid
            clothes={clothes}
            setClothes={setClothes}
            onToggleLike={handleToggleLike}
            onClothesClick={handleClothesClick}
          />
          {selectedClothing && (
            <ClothesDetailModal
              isOpen={isDetailModalOpen}
              onClose={() => setIsDetailModalOpen(false)}
              clothingItem={selectedClothing}
              categories={filteredCategories}
              setClothes={setClothes}
              memberId={otherMemberId}
              setCategories={setCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;
