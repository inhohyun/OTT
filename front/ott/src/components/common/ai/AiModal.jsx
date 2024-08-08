import React, { useEffect } from 'react';
import Select from 'react-select';
import defaultImage from '@/assets/images/default_picture.png';
import './Modal.css';
import ClothesGridSingleLine from './ClothesGridSingleLine';
import AiProceeding from './AiProceeding';
import AiResult from './AiResult';
import useStore from '@/data/ai/aiStore';

const Modal = ({ isOpen, onClose }) => {
  const currentStep = useStore((state) => state.currentStep);
  const setCurrentStep = useStore((state) => state.setCurrentStep);
  const selectedClothing = useStore((state) => state.selectedClothing);
  const setSelectedClothing = useStore((state) => state.setSelectedClothing);
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const sample = useStore((state) => state.sample);
  const setSample = useStore((state) => state.setSample);
  const modelPicture = useStore((state) => state.modelPicture);
  const modelImage = useStore((state) => state.modelImage);
  const setModelImage = useStore((state) => state.setModelImage);
  const setModelPicture = useStore((state) => state.setModelPicture);
  const selectClothesURL = useStore((state) => state.selectedClothesURL);
  const setSelectedClothesURL = useStore(
    (state) => state.setSelectedClothesURL
  );

  const clothes = useStore((state) => state.clothes);
  const toggleLike = useStore((state) => state.toggleLike);

  // 모달이 열릴 때 Zustand 상태를 콘솔에 출력

  const categories = [
    { value: '상의', label: '상의' },
    { value: '하의', label: '하의' },
  ];

  const imageOptions = [
    { value: 1, label: '1장' },
    { value: 2, label: '2장' },
    { value: 3, label: '3장' },
    { value: 4, label: '4장' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      'borderColor': state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black',
      },
      'boxShadow': state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a78bfa' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  if (!isOpen) return null;

  const handlePutOn = () => {
    if (selectedClothing) {
      setCurrentStep('AiProceeding');
    } else {
      alert('옷을 선택해주세요.');
    }
  };

  const handleClothingClick = (clothing) => {
    setSelectedClothing(clothing);
  };

  const handleFilterChange = (option) => {
    setFilter(option.value);
  };

  const handleSampleChange = (option) => {
    setSample(option.value); // 숫자가 저장되도록 수정
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      setModelImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setModelPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredClothes =
    filter === 'all'
      ? clothes
      : clothes.filter((clothing) => clothing.category === filter);

  return (
    <div className="modal-overlay custom-scrollbar mb-[65px]" onClick={onClose}>
      <div
        className="modal-container custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          onClick={onClose}
          className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-[1px] top-3"
        >
          &times;
        </p>
        <h2 className="text-center text-2xl font-semibold mb-4">
          AI 피팅 서비스
        </h2>
        {currentStep === 'AiProceeding' ? (
          <AiProceeding />
        ) : currentStep === 'AiResult' ? (
          <AiResult />
        ) : (
          <>
            <div>
              <h4>원본 사진</h4>
              <div
                className="image-container"
                onClick={() => document.getElementById('imageInput').click()}
              >
                <img
                  src={modelPicture || defaultImage}
                  alt="Default"
                  className="w-full h-auto mb-4 mt-4 rounded-lg"
                />
              </div>
              <input
                type="file"
                id="imageInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <h4 className="mt-4">생성할 사진 개수</h4>
            <div className="mb-4 dropdown-wrapper">
              <Select
                options={imageOptions}
                value={imageOptions.find((option) => option.value === sample)}
                onChange={handleSampleChange}
                styles={customStyles}
                className="flex-grow"
              />
            </div>
            <h4>저장된 옷</h4>
            <div className="mb-4 dropdown-wrapper">
              <Select
                options={categories}
                value={
                  categories.find((category) => category.value === filter) || {
                    value: '상의',
                    label: '상의',
                  }
                }
                onChange={handleFilterChange}
                styles={customStyles}
                className="flex-grow"
              />
            </div>
            <ClothesGridSingleLine
              clothes={filteredClothes}
              onToggleLike={toggleLike}
              onClothingClick={handleClothingClick}
            />
            <div className="mt-4">
              <button className="try-on-button" onClick={handlePutOn}>
                입어보기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
