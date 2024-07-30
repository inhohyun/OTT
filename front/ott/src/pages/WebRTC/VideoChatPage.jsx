import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import VideoChatModal from '../../components/webRTC/VideoChatModal';
import CustomClothesGrid from '../../components/webRTC/CustomClothesGrid';
import CustomCategoryDropdown from '../../components/webRTC/CustomCategoryDropdown';
import backgroundImage from '../../assets/images/background_image_main.png';
import clothesData from '../../pages/Closet/clothesData';

const VideoChatPage = () => {
  const { username } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [clothes, setClothes] = useState(clothesData);
  const categories = ['전체', '상의', '하의', '아우터', '한벌옷', '즐겨찾기'];

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleToggleLike = (id) => {
    setClothes((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const filteredClothes =
    selectedCategory === '전체'
      ? clothes
      : selectedCategory === '즐겨찾기'
        ? clothes.filter((item) => item.isLiked)
        : clothes.filter((item) => item.category === selectedCategory);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex-grow flex items-center justify-center h-1/3">
        <VideoChatModal />
      </div>
      <div className="flex-grow h-2/3">
        <div className="text-center my-2">
          <h2 className="text-xl font-bold mb-2">{username}님의 옷장</h2>
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
