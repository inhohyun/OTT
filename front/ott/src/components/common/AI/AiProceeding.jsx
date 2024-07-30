import React, { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import mainIcon from '@/assets/icons/main.logo.png';
import useStore from '@/data/ai/aiStore';

const AiProceeding = ({ selectedImage, numImages, selectedClothingId }) => {
  const percentage = useStore((state) => state.percentage);
  const setPercentage = useStore((state) => state.setPercentage);

  useEffect(() => {
    const duration = 5; // 50초 동안 진행
    const targetPercentage = 99;
    const increment = targetPercentage / duration;
    const interval = 1000; // 1초마다 업데이트

    const intervalId = setInterval(() => {
      setPercentage((prev) => {
        const nextPercentage = prev + increment;
        if (nextPercentage >= targetPercentage) {
          clearInterval(intervalId);
          return targetPercentage;
        }
        return nextPercentage;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [setPercentage]);

  // 전달받은 정보를 콘솔에 출력
  useEffect(() => {
    console.log('Selected Image:', selectedImage);
    console.log('Number of Images:', numImages);
    console.log('Selected Clothing ID:', selectedClothingId);
  }, [selectedImage, numImages, selectedClothingId]);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl shadow-lg max-w-lg mx-auto my-5"
      style={{ width: '70%' }}
    >
      <div className="w-full bg-violet-200 bg-opacity-60 rounded-t-2xl relative">
        <div
          className="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto"
          style={{ position: 'relative', top: '10px' }}
        >
          <img
            src={mainIcon}
            alt="main"
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col items-center">
        <div className="text-center mb-2">
          <p className="text-lg font-bold text-slate-500">AI 합성 진행중!!</p>
        </div>
        <div className="w-24 h-24">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}% 완료`}
            styles={buildStyles({
              textColor: '#4A4A4A',
              pathColor: '#a78bfa',
              trailColor: '#d6d6d6',
              textSize: '12px',
            })}
          />
        </div>
        <div className="mt-4">
          <p>생성할 이미지 수: {numImages.label}</p>
        </div>
      </div>
    </div>
  );
};

export default AiProceeding;
