import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_closet.png';
import CategoryDropdown from '../../components/closet/CategoryDropdown';
import ClothesGrid from '../../components/closet/ClothesGrid';
import AddClothesModal from '../../components/closet/AddClothesModal';

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
    { id: 1, category: '한벌옷', frontImage: dress1, backImage: dress1Back },
    { id: 2, category: '한벌옷', frontImage: dress2 },
    { id: 3, category: '한벌옷', frontImage: dress3 },
    { id: 4, category: '아우터', frontImage: outer1, backImage: outer1Back },
    { id: 5, category: '아우터', frontImage: outer2, backImage: outer2Back },
    { id: 6, category: '아우터', frontImage: outer3, backImage: outer3Back },
    { id: 7, category: '하의', frontImage: pants1, backImage: pants1Back },
    { id: 8, category: '하의', frontImage: pants2, backImage: pants2Back },
    { id: 9, category: '하의', frontImage: pants3, backImage: pants3Back },
    { id: 10, category: '상의', frontImage: shirt1, backImage: shirt1Back },
    { id: 11, category: '상의', frontImage: shirt2, backImage: shirt2Back },
    { id: 12, category: '상의', frontImage: shirt3, backImage: shirt3Back },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allCategories = [
    '상의',
    '하의',
    '아우터',
    '한벌옷',
    '즐겨찾기',
    ...new Set(clothes.map((item) => item.category)),
  ];

  const uniqueCategories = [...new Set(allCategories)];

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleAddClothes = (newClothes) => {
    setClothes([...clothes, newClothes]);
  };

  const filteredClothes =
    selectedCategory === '전체'
      ? clothes
      : selectedCategory === '즐겨찾기'
        ? clothes.filter((item) => item.isLiked)
        : clothes.filter((item) => item.category === selectedCategory);

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover pb-30"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <CategoryDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ClothesGrid clothes={filteredClothes} />
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
        >
          + 옷 추가하기
        </button>
      </div>
      <AddClothesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClothes={handleAddClothes}
        categories={uniqueCategories.filter((cat) => cat !== '즐겨찾기')}
      />
    </div>
  );
};

export default ClosetPage;
