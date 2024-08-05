import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useStore from '@/data/ai/aiStore'; // Zustand 상태 관리 파일을 import 합니다

const AiResult = ({ selectedImage, numImages }) => {
  const setCurrentStep = useStore((state) => state.setCurrentStep);
  const resetPercentage = useStore((state) => state.resetPercentage);
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);

  const numberOfImages = parseInt(numImages.value);
  const images = Array.from({ length: numberOfImages }).map((_, index) => ({
    src: selectedImage,
    alt: `result-${index + 1}`,
  }));

  const handleHomeClick = () => {
    resetPercentage();
    setIsModalVisible(false);
    setCurrentStep('Home');
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg max-w-lg mx-auto my-5">
      <h2 className="text-center text-2xl font-semibold mb-4">AI 합성 결과</h2>
      <Carousel showThumbs={true} infiniteLoop={true} showStatus={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-lg shadow-md"
            />
          </div>
        ))}
      </Carousel>
      <button
        className="mt-4 px-4 py-2 bg-violet-300 text-white rounded-lg shadow-md "
        onClick={handleHomeClick} // 상태 초기화를 처리하는 함수 호출
      >
        홈으로
      </button>
    </div>
  );
};

export default AiResult;
