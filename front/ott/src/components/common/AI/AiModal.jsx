import React, { useState } from 'react';
import defaultImage from '../../../assets/images/default_picture.png';
import './Modal.css';
import dressOne from '../../../assets/images/clothes/dress1.jpg';
import dressTwo from '../../../assets/images/clothes/dress2.jpg';
import dressThree from '../../../assets/images/clothes/dress3.jpg';
import outerOne from '../../../assets/images/clothes/outer1.jpg';
import outerTwo from '../../../assets/images/clothes/outer2.jpg';
import outerThree from '../../../assets/images/clothes/outer3.jpg';
// import AiProceeding from './AiProceeding';
// import AiResult from './AiResult';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedClothing, setSelectedClothing] = useState(null);
  const [filter, setFilter] = useState('all');

  const handlePutOn = () => {
    // TODO - 입어보기 버튼 컨트롤
    console.log('Selected Clothing:', selectedClothing);
  };

  const handleClothingClick = (clothing) => {
    setSelectedClothing(clothing);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const savedClothes = [
    {
      id: 1,
      src: dressOne,
      alt: 'Clothing 1',
      division: 'dress',
    },
    {
      id: 2,
      src: dressTwo,
      alt: 'Clothing 2',
      division: 'dress',
    },
    {
      id: 3,
      src: dressThree,
      alt: 'Clothing 3',
      division: 'dress',
    },
    {
      id: 4,
      src: outerOne,
      alt: 'Clothing 4',
      division: 'tops',
    },
    {
      id: 5,
      src: outerTwo,
      alt: 'Clothing 5',
      division: 'tops',
    },
    {
      id: 6,
      src: outerThree,
      alt: 'Clothing 6',
      division: 'tops',
    },
  ];

  const filteredClothes =
    filter === 'all'
      ? savedClothes
      : savedClothes.filter((clothing) => clothing.division === filter);

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
            <option value="tops">상의</option>
            <option value="bottoms">하의</option>
            <option value="dress">드레스</option>
          </select>
        </div>
        <div className="flex overflow-x-auto space-x-2 mb-4">
          {filteredClothes.map((clothing) => (
            <img
              key={clothing.id}
              src={clothing.src}
              alt={clothing.alt}
              className={`w-20 h-20 cursor-pointer border-4 ${
                selectedClothing?.id === clothing.id
                  ? 'border-violet-500'
                  : 'border-transparent'
              }`}
              onClick={() => handleClothingClick(clothing)}
            />
          ))}
        </div>
        <button className="try-on-button" onClick={() => handlePutOn()}>
          입어보기
        </button>
      </div>
    </div>
  );
};

export default Modal;
