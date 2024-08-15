import React, { useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import mainIcon from '@/assets/icons/main.logo.png';
import useStore from '@/data/ai/aiStore';
import useUserStore from '../../../data/lookbook/userStore';
import { sendfittingData } from '@/api/ai/ai';
const AiProceeding = () => {
  // 프로그래스 바 상태 관리
  const percentage = useStore((state) => state.percentage);
  const startInterval = useStore((state) => state.startInterval);
  const setCurrentStep = useStore((state) => state.setCurrentStep);

  // 서버에 보낼 데이터
  const modelPicture = useStore((state) => state.modelPicture);
  const filter = useStore((state) => state.filter);
  const modelImage = useStore((state) => state.modelImage);
  const sample = useStore((state) => state.sample);
  const selectedClothesURL = useStore((state) => state.selectedClothesURL);
  // 이미지 결과
  const resultImages = useStore((state) => state.resultImages);
  const setResultImages = useStore((state) => state.setResultImages);

  // Ref를 통해 모달이 이전에 열렸는지 여부를 추적
  const hasModalOpenedRef = useRef(false);

  const memberId = useUserStore((state) => state.userId);
  useEffect(() => {
    // 페이지 로드 시 sessionStorage에서 값을 읽어옴
    const hasModalOpened = sessionStorage.getItem('hasModalOpened');
    if (hasModalOpened === 'true') {
      hasModalOpenedRef.current = true;
    } else {
      hasModalOpenedRef.current = false;
    }

    startInterval(); // 프로그레스 바 업데이트 시작

    return () => {
      // 컴포넌트가 언마운트될 때 인터벌을 멈추지 않도록 설정
    };
  }, [startInterval]);

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
        // await로 응답 올 때까지 기다림
        const response = await sendfittingData(
          memberId,
          modelImageFile,
          clothImagePath,
          sample,
          category
        );
        console.log('ai 서버로부터 반환받은 데이터', response);
        // 서버에서 받은 이미지 처리
        setResultImages(response.data.images);
        sessionStorage.setItem('hasModalOpened', 'false'); // 넘어간 이후 모달은 최초 모달임을 표시
        setCurrentStep('AiResult');
        // 서버 응답 처리 로직 추가
      } catch (error) {
        console.error('AI 옷 피팅 중 에러 발생(컴포넌트):', error);
      }
    };

    if (!hasModalOpenedRef.current) {
      console.log('모달 서버 호출 테스트');
      console.log('서버에 보낼 옷 url', selectedClothesURL);
      // FIXME : 하드코딩한 버전
      // sendData(
      //   1,
      //   modelImage,
      //   'https://s3-bucket-ott.s3.ap-northeast-2.amazonaws.com/pant.jpg',
      //   sample,
      //   filter === '상의' ? 0 : 1
      // );
      // FIXME : 하드코딩 제거한 버전
      sendData(
        memberId,
        modelImage,
        selectedClothesURL,
        sample,
        filter === '상의' ? 0 : 1
      );

      // 모달이 열렸음을 표시
      hasModalOpenedRef.current = true;
      sessionStorage.setItem('hasModalOpened', 'true'); // sessionStorage에 저장
    }
  }, []); // 빈 배열을 종속성 배열로 설정하여 컴포넌트가 마운트될 때만 실행

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
          <p>생성할 이미지 수: {sample}</p>
        </div>
      </div>
    </div>
  );
};

export default AiProceeding;
