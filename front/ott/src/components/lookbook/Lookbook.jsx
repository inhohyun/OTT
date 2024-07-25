import React, { useState } from 'react';
import LookbookDetail from './LookbookDetail';
import lookbookimg from '../../../public/icon-512x512.png';

const Lookbook = () => {
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const dummyLookbook = {
        id: 1,
        name: 'Summer Collection',
        image: lookbookimg,
        date: '2024년 7월 16일',
        timeAgo: '몇시간 전',
        likes: 120,
        creatorName: '이름',
        tags: ['#여름', '#한여름의 도시남', '#태그 또 뭐하지'],
        comments : [
            {
                author: '사용자1',
                text: '이 옷 정말 좋아요!',
                time: '2시간 전',
            },
            {
                author: '사용자2',
                text: '이 색상이 정말 예쁘네요.',
                time: '1시간 전',
            },
            {
                author: '사용자2',
                text: '이 색상이 정말 예쁘네요.',
                time: '1시간 전',
            },
            {
                author: '사용자2',
                text: '이 색상이 정말 예쁘네요.',
                time: '1시간 전',
            },
            {
                author: '사용자2',
                text: '이 색상이 정말 예쁘네요.',
                time: '1시간 전',
            },
            {
                author: '사용자2',
                text: '이 색상이 정말 예쁘네요.',
                time: '1시간 전',
            },
        ]
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
                className="w-[120px] h-[170px] rounded-lg overflow-hidden shadow-lg bg-white m-2 flex-shrink-0 cursor-pointer"
            >
                <div className="px-2 py-1 flex justify-between items-center">
                    <div className="font-bold text-xs mb-1">{dummyLookbook.creatorName}</div>
                    <p className="text-gray-600 text-xs">{dummyLookbook.timeAgo}</p>
                </div>
                <div className="px-3 py-1 mb-1">
                    <img className="w-full h-20 object-cover" src={dummyLookbook.image} alt={dummyLookbook.name} />
                </div>
                <div className="px-3 pb-1 flex justify-end items-center">
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-600 text-xs">❤ {dummyLookbook.likes}</span>
                        <span className="text-gray-600 text-xs">🗨 {dummyLookbook.comments.length}</span>
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
