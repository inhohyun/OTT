import { useRef, useEffect, useState } from 'react';
import Lookbook from '../lookbook/Lookbook';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import { getPrivateLookbookList } from '../../api/user/userLookbook';
import useLookbookStore from '../../data/lookbook/detailStore';
import { fetchMyLookbooks } from '../../api/lookbook/mylookbook';
import React from 'react';
import useUserStore from '../../data/lookbook/userStore';

const PrivatePosts = ({ isMe }) => {
  const [lookbooks, setLookbooks] = useState([]);
  const { deleteLookbook, hideDetail } = useLookbookStore();
  const memberId = useUserStore((state) => state.userId);
  // Create an array with the length of 10 for rendering multiple Lookbook components
  // const lookbooks = Array.from({ length: 10 }, (_, index) => ({
  //   nickname: `Creator ${index + 1}`,
  //   createdAt: new Date().toISOString(),
  //   images: [{ imagePath: { path: 'https://via.placeholder.com/150' } }],
  //   name: `Lookbook ${index + 1}`,
  //   likes: Math.floor(Math.random() * 100),
  //   comments: Array.from(
  //     { length: Math.floor(Math.random() * 10) },
  //     (_, i) => ({ id: i, text: 'Comment' })
  //   ),
  // }));
  useEffect(() => {
    const getPrivateLookbooks = async () => {
      try {
        const response = await getPrivateLookbookList(memberId);
        // console.log('가져온 비공개 룩북, Lookbook에 보내기', response);
        setLookbooks(response);
      } catch (error) {
        // console.error('Failed to get private lookbooks:', error);
      }
    };
    getPrivateLookbooks();
  }, []);
  // Reference for scroll container
  const containerRef = useRef(null);

  // Scroll functions
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleDelete = (deletedLookbookId) => {
    deleteLookbook(deletedLookbookId);
    // handleCloseDetail();
    hideDetail();
  };

  const handleCloseDetail = async () => {
    // console.log('[*]모달 닫기');
    hideDetail();
  };
  if (!isMe) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={lockIcon} alt="Lock Icon" className="w-24 h-24 mb-4" />
        <p className="text-gray-500 text-xl">비공개 계정입니다.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full space-y-5">
      <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>
      <div className="w-full">
        <div className="relative flex items-center">
          <button
            onClick={() => scrollLeft(containerRef)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
            style={{
              backgroundImage: `url(${leftArrow})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></button>
          {/* <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide flex space-x-4"
          >
            <div className="flex flex-col">
              <div className="flex space-x-4">
                {lookbooks.slice(0, 5).map((lookbook, index) => (
                  <Lookbook
                    key={index}
                    data={lookbook}
                    onClose={handleCloseDetail}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
              <div className="flex space-x-4">
                {lookbooks.slice(5).map((lookbook, index) => (
                  <Lookbook
                    key={index + 5}
                    data={lookbook}
                    onClose={handleCloseDetail}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div> */}
          <div ref={containerRef} className="overflow-x-auto scrollbar-hide">
            <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-1">
              {lookbooks.map((lookbook, index) => (
                <Lookbook
                  key={index}
                  data={lookbook}
                  onClose={handleCloseDetail}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => scrollRight(containerRef)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-1 rounded-full z-10 w-8 h-8"
            style={{
              backgroundImage: `url(${rightArrow})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default PrivatePosts;
