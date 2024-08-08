import React, { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import mainIcon from '@/assets/icons/main.logo.png';
import useStore from '@/data/ai/aiStore';
import { sendfittingData } from '@/api/ai/ai';

const AiProceeding = ({}) => {
  const percentage = useStore((state) => state.percentage);
  const setPercentage = useStore((state) => state.setPercentage);
  const setCurrentStep = useStore((state) => state.setCurrentStep);

  //서버에 보낼 데이터
  const modelPicture = useStore((state) => state.modelPicture);
  const filter = useStore((state) => state.filter);
  const modelImage = useStore((state) => state.modelImage);
  const selectClothesURL = useStore((state) => state.selectedClothesURL); // TODO : 선택된 URL에 따른 경로로 변동
  const duration = 50; // TODO: ai 모델 결과에 따라, 이후 수정 예정
  const sample = useStore((state) => state.sample);
  const targetPercentage = 99; // 목표 퍼센트는 99
  const increment = targetPercentage / duration;
  const interval = 1000; // 1초마다 업데이트

  //이미지 결과
  const resultImages = useStore((state) => state.resultImages);
  const setResultImages = useStore((state) => state.setResultImages);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((prev) => {
        const nextPercentage = prev + increment;
        if (nextPercentage >= targetPercentage) {
          clearInterval(intervalId);
          // setCurrentStep('AiResult'); // 99%에 도달하면 currentStep을 AiResult로 변경
          return 99;
        }
        return nextPercentage;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [setPercentage, setCurrentStep]);

  useEffect(() => {
    // 서버로 데이터를 전송하는 로직 추가

    const sendData = async (
      memberId,
      modelImageFile,
      clothImagePath,
      sample,
      category
    ) => {
      try {
        //await로 응답 올때까지 기다림?
        const response = await sendfittingData(
          memberId,
          modelImageFile,
          clothImagePath,
          sample,
          category
        );
        console.log('서버에서 받은 이미지', response);
        setResultImages(response.data.images);
        setCurrentStep('AiResult');
        // 서버 응답 처리 로직 추가
      } catch (error) {
        console.error('AI 옷 피팅 중 에러 발생(컴포넌트):', error);
      }
    };

    sendData(
      1,
      modelImage,
      'https://s3-bucket-ott.s3.ap-northeast-2.amazonaws.com/pant.jpg',
      sample,
      // filter
      1
    );
  }, []);

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
          <p>생성할 이미지 수: {sample.label}</p>
        </div>
      </div>
    </div>
  );
};

export default AiProceeding;
