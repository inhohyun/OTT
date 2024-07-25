import React, { useState } from 'react';
import LookbookDetail from './LookbookDetail';
import lookbookimg from '../../../public/icon-512x512.png'

const Lookbook = () => {
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    // Dummy data for the lookbook
    const dummyLookbook = {
        id: 1,
        name: 'Summer Collection',
        image: lookbookimg,
        date: '2024년 7월 16일',
        timeAgo: '몇시간 전',
        likes: 120,
        comments: 15,
        creatorName: '이름',
        tags: ['#여름', '#한여름의 도시남', '#태그 또 뭐하지'],
    };

    const handleShowDetail = () => {
        setIsDetailVisible(true);
    };

    const handleCloseDetail = () => {
        setIsDetailVisible(false);
    };

    return (
        <>
            <div
                onClick={handleShowDetail}
                className="w-40 h-50 rounded-lg overflow-hidden shadow-lg bg-white m-3 flex-shrink-0 cursor-pointer"
            >
                <div className="px-4 py-2 flex justify-between items-center">
                    <div className="font-bold text-base mb-1">{dummyLookbook.creatorName}</div>
                    <p className="text-gray-600 text-xs">{dummyLookbook.timeAgo}</p>
                </div>
                <div className="px-3 py-1">
                    <img className="w-full h-24 object-cover" src={dummyLookbook.image} alt={dummyLookbook.name} />
                </div>
                <div className="px-4 pb-2 flex justify-end items-center">
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-600 text-base">❤ {dummyLookbook.likes}</span>
                        <span className="text-gray-600 text-base">🗨 {dummyLookbook.comments}</span>
                    </div>
                </div>
            </div>

            {isDetailVisible && (
                <LookbookDetail lookbook={dummyLookbook} onClose={handleCloseDetail} />
            )}
        </>
    );
};

export default Lookbook;
