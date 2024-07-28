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
  const clothes = [
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
  ];

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleAddClothes = () => {
    // Implement logic to add new clothes
    const newClothes = { id: clothes.length + 1, category: '상의', frontImage: '../../assets/images/clothes/shirt1.jpg' }; // Example data
    setClothes([...clothes, newClothes]);
  };

  const filteredClothes = selectedCategory === '전체'
    ? clothes
    : clothes.filter(item => item.category === selectedCategory);

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <CategoryDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
<ClothesGrid clothes={filteredClothes} />    </div>
  );
};

export default ClosetPage;
