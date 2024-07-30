import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';

// Importing images
import dress1 from '../../assets/images/clothes/dress1.jpg';
import dress1Back from '../../assets/images/clothes/dress1-1.jpg';
import dress2 from '../../assets/images/clothes/dress2.jpg';
import dress3 from '../../assets/images/clothes/dress3.jpg';
import outer1 from '../../assets/images/clothes/outer1.jpg';
import outer1Back from '../../assets/images/clothes/outer1-1.jpg';
import outer2 from '../../assets/images/clothes/outer2.jpg';
import outer2Back from '../../assets/images/clothes/outer2-1.jpg';
import outer3 from '../../assets/images/clothes/outer3.jpg';
import outer3Back from '../../assets/images/clothes/outer3-1.jpg';
import pants1 from '../../assets/images/clothes/pants1.jpg';
import pants1Back from '../../assets/images/clothes/pants1-1.jpg';
import pants2 from '../../assets/images/clothes/pants2.jpg';
import pants2Back from '../../assets/images/clothes/pants2-1.jpg';
import pants3 from '../../assets/images/clothes/pants3.jpg';
import pants3Back from '../../assets/images/clothes/pants3-1.jpg';
import shirt1 from '../../assets/images/clothes/shirt1.jpg';
import shirt1Back from '../../assets/images/clothes/shirt1-1.jpg';
import shirt2 from '../../assets/images/clothes/shirt2.jpg';
import shirt2Back from '../../assets/images/clothes/shirt2-1.jpg';
import shirt3 from '../../assets/images/clothes/shirt3.jpg';
import shirt3Back from '../../assets/images/clothes/shirt3-1.jpg';

const ClosetPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [clothes, setClothes] = useState([
    {
      id: 1,
      category: '한벌옷',
      frontImage: dress1,
      backImage: dress1Back,
      isLiked: false,
    },
    { id: 2, category: '한벌옷', frontImage: dress2, isLiked: false },
    { id: 3, category: '한벌옷', frontImage: dress3, isLiked: false },
    {
      id: 4,
      category: '아우터',
      frontImage: outer1,
      backImage: outer1Back,
      isLiked: false,
    },
    {
      id: 5,
      category: '아우터',
      frontImage: outer2,
      backImage: outer2Back,
      isLiked: false,
    },
    {
      id: 6,
      category: '아우터',
      frontImage: outer3,
      backImage: outer3Back,
      isLiked: false,
    },
    {
      id: 7,
      category: '하의',
      frontImage: pants1,
      backImage: pants1Back,
      isLiked: false,
    },
    {
      id: 8,
      category: '하의',
      frontImage: pants2,
      backImage: pants2Back,
      isLiked: false,
    },
    {
      id: 9,
      category: '하의',
      frontImage: pants3,
      backImage: pants3Back,
      isLiked: false,
    },
    {
      id: 10,
      category: '상의',
      frontImage: shirt1,
      backImage: shirt1Back,
      isLiked: false,
    },
    {
      id: 11,
      category: '상의',
      frontImage: shirt2,
      backImage: shirt2Back,
      isLiked: false,
    },
    {
      id: 12,
      category: '상의',
      frontImage: shirt3,
      backImage: shirt3Back,
      isLiked: false,
    },
  ]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleAddClothes = () => {
    const newClothes = {
      id: clothes.length + 1,
      category: '상의',
      frontImage: '../../assets/images/clothes/shirt1.jpg',
      isLiked: false,
    }; // Example data
    setClothes([...clothes, newClothes]);
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
      className="relative flex flex-col items-center w-full min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        paddingBottom: '7.5rem',
      }} // pb-30 equivalent
    >
      <CategoryDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ClothesGrid clothes={filteredClothes} onToggleLike={handleToggleLike} />
      <div
        className="flex justify-center mt-5"
        style={{ paddingBottom: '7.5rem' }}
      >
        <button
          onClick={handleAddClothes}
          className="p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
        >
          + 옷 추가하기
        </button>
      </div>
    </div>
  );
};

export default ClosetPage;
