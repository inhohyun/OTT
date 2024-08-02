import React, { useState } from 'react';
import LookbookDetail from '../lookbook/LookbookDetail';
import hearticon from '../../assets/icons/hearticon.png';
import commenticon from '../../assets/icons/commenticon.png';

const userLookbook = ({ data }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedLookbook, setSelectedLookbook] = useState(null);

  const handleShowDetail = () => {
    setSelectedLookbook(data);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setIsDetailVisible(false);
    setSelectedLookbook(null);
  };

  const calcTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt.replace(' ', 'T'));
    const diffInSeconds = (now - createdDate) / 1000; // Difference in seconds

    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30; // Approximate month
    const diffInYears = diffInDays / 365; // Approximate year

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)}초 전`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}분 전`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays)}일 전`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)}달 전`;
    } else {
      return `${Math.floor(diffInYears)}년 전`;
    }
  };
  return (
    <>
      <div
        onClick={handleShowDetail}
        className="w-[120px] h-[160px] rounded-[5px] overflow-hidden shadow-lg bg-white m-2 flex-shrink-0 cursor-pointer"
      >
        <div className="px-2 py-1 flex justify-between items-center">
          <div className="font-bold text-xs mb-1 text-[15px]">
            {data.nickname}
          </div>
          <p className="text-stone-300 text-xs text-[8px]">
            {calcTimeAgo(data.createdAt)}
          </p>
        </div>
        <div className="px-3 py-1 mb-1">
          <img
            className="w-full h-20 object-cover"
            src={data.thumbnail}
            alt={data.name}
          />
        </div>
        <div className="px-3 pb-1 flex justify-end items-center">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <img src={hearticon} alt="hearticon" className="w-4 mr-1 mt-1" />
              <span className="text-gray-600 text-[10px] mt-1">
                {/* {data.likes} */}
                좋아요 수
              </span>
            </div>
            <div className="flex items-center">
              <img
                src={commenticon}
                alt="commenticon"
                className="w-4 mr-1 mt-1"
              />
              <span className="text-gray-600 text-[10px] mt-1">
                {data.comments.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isDetailVisible && (
        <LookbookDetail
          lookbook={selectedLookbook}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

export default userLookbook;
