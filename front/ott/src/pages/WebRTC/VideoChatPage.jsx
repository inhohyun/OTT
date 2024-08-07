import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VideoChatModal from '../../components/webRTC/VideoChatModal';
import CustomClothesGrid from '../../components/webRTC/CustomClothesGrid';
import CustomCategoryDropdown from '../../components/webRTC/CustomCategoryDropdown';
import backgroundImage from '../../assets/images/background_image_main.png';
import clothesData from '../../pages/Closet/clothesData';

const VideoChatPage = () => {
  // URL에서 username을 추출
  const { username } = useParams(); 
  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('전체'); 
  // 옷 데이터 상태
  const [clothes, setClothes] = useState(clothesData); 
  // 카테고리 목록
  const categories = ['전체', '상의', '하의', '아우터', '한벌옷', '즐겨찾기']; 

  // 선택된 카테고리와 옷 데이터를 console에 출력
  useEffect(() => {
    console.log('Selected Category:', selectedCategory);
    console.log('Clothes before filtering:', clothes);
  }, [selectedCategory, clothes]);

  // 카테고리 변경
  const handleCategoryChange = (newCategory) => {
    // 선택된 카테고리 업데이트
    setSelectedCategory(newCategory); 
  };

  // 좋아요 상태 토글
  const handleToggleLike = (id) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  // 선택된 카테고리에 따라 옷 데이터 필터링
  const filteredClothes =
    selectedCategory === '전체'
      ? clothes
      : selectedCategory === '즐겨찾기'
      ? clothes.filter((item) => item.isLiked)
      : clothes.filter((item) => item.category === selectedCategory);

  // 필터링된 옷 console에 출력
  console.log('Filtered Clothes:', filteredClothes); 

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
          <h2 className="text-xl font-bold mb-2">{username}님의 옷장</h2> {/* 사용자 이름 표시 */}
          <div className="flex justify-center mt-[-5%]">
            <CustomCategoryDropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={categories}
            />
          </div>
        </div>
        <div className="mt-[-5%]">
          <CustomClothesGrid
            clothes={filteredClothes}
            onToggleLike={handleToggleLike}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;
