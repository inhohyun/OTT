import React from 'react';
import logo from '../../assets/icons/main.logo.png';

const FeedNoFollow = ({ setActiveComponent }) => {
  const handleRecommendationClick = () => {
    setActiveComponent('recommendation');
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg max-w-lg mx-auto mt-[10vh]" style={{ width: '70%' }}>
      <div className="w-full bg-violet-200 bg-opacity-60 rounded-t-2xl p-4 relative">
        {/* Move the logo container down without affecting the purple background */}
        <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mx-auto" style={{ position: 'relative', top: '25px' }}>
          <img src={logo} alt="No Follow" className="w-[60px] h-[60px] rounded-full" />
        </div>
      </div>
      <div className="w-full bg-white rounded-b-2xl p-6 flex flex-col items-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-500 mb-4">현재 팔로우하는 <br />사람이 없습니다!</p>
          <p className="text-sm text-slate-500 mb-6">사람들을 팔로우해 <br />스타일 추천을 받아보세요!</p>
        </div>
        <div className="flex justify-around w-full">
          <button 
            className="bg-violet-200 text-violet-700 font-semibold py-2 px-4 rounded-full shadow-md font-dohyeon"
            style={{ fontFamily: 'dohyeon' }} 
            onClick={handleRecommendationClick}
          >
            추천받기
          </button>
          <button 
            className="bg-violet-200 text-violet-700 font-semibold py-2 px-4 rounded-full shadow-md font-dohyeon"
            style={{ fontFamily: 'dohyeon' }}
          >
            검색하기
          </button>
        </div>
      </div>
    </div>

  );
};

export default FeedNoFollow;
