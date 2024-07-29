import React from 'react';
// import AiSample from '@/assets/images/ai_result_sample.png';
const AiResult = ({ selectedClothing }) => {
  return (
    <div>
      <h2>AI 피팅 결과</h2>
      <p>선택된 옷: {selectedClothing ? selectedClothing.alt : '없음'}</p>
      {/* 여기에 AI 피팅 결과를 표시하는 로직을 추가하세요 */}
    </div>
  );
};

export default AiResult;
