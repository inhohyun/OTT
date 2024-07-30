import React, { useState } from 'react';
import LookbookDetail from './LookbookDetail';
import hearticon from '../../assets/icons/hearticon.png';
import commenticon from '../../assets/icons/commenticon.png';

const Lookbook = ({ data }) => {
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

  return (
    <>
      <div
        onClick={handleShowDetail}
        className="w-[120px] h-[160px] rounded-[5px] overflow-hidden shadow-lg bg-white m-2 flex-shrink-0 cursor-pointer"
      >
        <div className="px-2 py-1 flex justify-between items-center">
          <div className="font-bold text-xs mb-1 text-[15px]">
            {data.creatorName}
          </div>
          <p className="text-stone-300 text-xs text-[8px]">{data.timeAgo}</p>
        </div>
        <div className="px-3 py-1 mb-1">
          <img
            className="w-full h-20 object-cover"
            src={data.image}
            alt={data.name}
          />
        </div>
        <div className="px-3 pb-1 flex justify-end items-center">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <img src={hearticon} alt="hearticon" className="w-4 mr-1 mt-1" />
              <span className="text-gray-600 text-[10px] mt-1">
                {data.likes}
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

export default Lookbook;
