import React, { useState } from 'react';
import defaultImage from '@/assets/images/default_picture.png';
import './Modal.css';
import AiResult from './AiResult'; // AiResult 컴포넌트를 import
import ClothesGridSingleLine from './ClothesGridSingleLine'; // ClothesGridSingleLine 컴포넌트를 import

// Importing images
import dress1 from '@/assets/images/clothes/dress1.jpg';
import dress1Back from '@/assets/images/clothes/dress1-1.jpg';
import dress2 from '@/assets/images/clothes/dress2.jpg';
import dress3 from '@/assets/images/clothes/dress3.jpg';
import outer1 from '@/assets/images/clothes/outer1.jpg';
import outer1Back from '@/assets/images/clothes/outer1-1.jpg';
import outer2 from '@/assets/images/clothes/outer2.jpg';
import outer2Back from '@/assets/images/clothes/outer2-1.jpg';
import outer3 from '@/assets/images/clothes/outer3.jpg';
import outer3Back from '@/assets/images/clothes/outer3-1.jpg';
import pants1 from '@/assets/images/clothes/pants1.jpg';
import pants1Back from '@/assets/images/clothes/pants1-1.jpg';
import pants2 from '@/assets/images/clothes/pants2.jpg';
import pants2Back from '@/assets/images/clothes/pants2-1.jpg';
import pants3 from '@/assets/images/clothes/pants3.jpg';
import pants3Back from '@/assets/images/clothes/pants3-1.jpg';
import shirt1 from '@/assets/images/clothes/shirt1.jpg';
import shirt1Back from '@/assets/images/clothes/shirt1-1.jpg';
import shirt2 from '@/assets/images/clothes/shirt2.jpg';
import shirt2Back from '@/assets/images/clothes/shirt2-1.jpg';
import shirt3 from '@/assets/images/clothes/shirt3.jpg';
import shirt3Back from '@/assets/images/clothes/shirt3-1.jpg';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedClothing, setSelectedClothing] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isTryingOn, setIsTryingOn] = useState(false); // 상태 추가

  const handlePutOn = () => {
    if (selectedClothing) {
      console.log('Selected Clothing ID:', selectedClothing.id);
      console.log('Selected Filter:', filter);
      setIsTryingOn(true); // 입어보기 버튼 클릭 시 상태 변경
    } else {
      console.log('No clothing selected');
    }
  };

  const handleClothingClick = (clothing) => {
    setSelectedClothing(clothing);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

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

  const filteredClothes =
    filter === 'all'
      ? clothes
      : clothes.filter((clothing) => clothing.category === filter);

  const handleToggleLike = (id) => {
    setClothes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <p
          onClick={onClose}
          className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-[1px] top-3"
        >
          &times;
        </p>
        <h2 className="text-center text-2xl font-semibold mb-4">
          AI 피팅 서비스
        </h2>
        {isTryingOn ? (
          <AiResult selectedClothing={selectedClothing} /> // 입어보기 상태일 때 AiResult 컴포넌트 렌더링
        ) : (
          <>
            <h4>원본 사진</h4>
            <img
              src={defaultImage}
              alt="Default"
              className="w-full h-auto mb-4 mt-4"
            />
            <h4>저장된 옷</h4>
            <div className="mb-4">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="dropdown"
              >
                <option value="all">모두</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="한벌옷">한벌옷</option>
                <option value="아우터">아우터</option>
              </select>
            </div>
            <ClothesGridSingleLine
              clothes={filteredClothes}
              onToggleLike={handleToggleLike}
              onClothingClick={handleClothingClick}
            />
            <button className="try-on-button" onClick={handlePutOn}>
              입어보기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
