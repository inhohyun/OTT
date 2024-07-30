import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import logo from '@/assets/icons/main.logo.png'; // 로고 이미지 경로를 적절히 수정하세요

const AiProceeding = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const duration = 50; // 50초 동안 진행
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
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl shadow-lg max-w-lg mx-auto my-5"
      style={{ width: '70%' }}
    >
      <div className="w-full bg-violet-200 bg-opacity-60 rounded-t-2xl relative">
        {' '}
        {/* 패딩 값을 줄임 */}
        <div
          className="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto"
          style={{ position: 'relative', top: '10px' }} // top 값을 15px에서 10px로 줄임
        >
          <img
            src={logo}
            alt="AI Proceeding"
            className="w-[50px] h-[50px] rounded-full" // 로고 크기를 줄임
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-b-2xl p-4 flex flex-col items-center">
        {' '}
        {/* 패딩 값을 줄임 */}
        <div className="text-center mb-2">
          {' '}
          {/* 아래 마진 값을 줄임 */}
          <p className="text-lg font-bold text-slate-500">AI 합성 진행중!!</p>
        </div>
        <div className="w-24 h-24">
          {' '}
          {/* 진행 표시기 크기를 줄임 */}
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}% 완료`}
            styles={buildStyles({
              textColor: '#4A4A4A',
              pathColor: '#a78bfa',
              trailColor: '#d6d6d6',
              textSize: '12px', // 텍스트 크기를 작게 설정
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default AiProceeding;
