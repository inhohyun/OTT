import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useStore from '@/data/ai/aiStore'; // Zustand 상태 관리 파일을 import 합니다

const AiResult = () => {
  const setCurrentStep = useStore((state) => state.setCurrentStep);
  const resetPercentage = useStore((state) => state.resetPercentage);
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);

  const resultImages = useStore((state) => state.resultImages);

  const handleHomeClick = () => {
    resetPercentage();
    setIsModalVisible(false);
    setCurrentStep('Home');
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg w-full max-w-lg mx-auto my-5 p-4">
      <h3 className="text-center text-2xl font-semibold mb-4">AI 합성 결과</h3>
      <div className="w-full">
        <Carousel
          showThumbs={true}
          infiniteLoop={true}
          showStatus={false}
          className="w-full"
          thumbWidth={50}
        >
          {resultImages.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={`data:image/png;base64, ${image}`}
                className="rounded-lg shadow-md max-h-[44vh]"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <button
        className=" px-4 py-2 bg-violet-300 text-white rounded-lg shadow-md"
        onClick={handleHomeClick} // 상태 초기화를 처리하는 함수 호출
      >
        홈으로
      </button>
    </div>
  );
};

export default AiResult;
