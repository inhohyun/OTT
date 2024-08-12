import { useRef, useEffect } from 'react';
import Lookbook from '../lookbook/Lookbook';
import leftArrow from '../../assets/icons/left_arrow_icon.png';
import rightArrow from '../../assets/icons/right_arrow_icon.png';
import React from 'react';
import { getPublicLookbookList } from '../../api/user/userLookbook';

const PublicPosts = () => {
  const lookbooks = Array.from({ length: 10 }, (_, index) => ({
    nickname: `Creator ${index + 1}`,
    createdAt: new Date().toISOString(),
    images: [{ imagePath: { path: 'https://via.placeholder.com/150' } }],
    name: `Lookbook ${index + 1}`,
    likes: Math.floor(Math.random() * 100),
    comments: Array.from(
      { length: Math.floor(Math.random() * 10) },
      (_, i) => ({ id: i, text: 'Comment' })
    ),
  }));
  useEffect(() => {
    const getPublicLookbooks = async () => {
      try {
        const response = await getPublicLookbookList();
        console.log('가져온 공개된 룩북, Lookbook에 보내기', response);
      } catch (error) {
        console.error('Failed to get public lookbooks:', error);
      }
    };
    getPublicLookbooks();
  }, []);
  const containerRef = useRef(null);

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
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide flex space-x-4"
          >
            <div className="flex flex-col">
              <div className="flex space-x-4">
                {lookbooks.slice(0, 5).map((lookbook, index) => (
                  <Lookbook key={index} data={lookbook} />
                ))}
              </div>
              <div className="flex space-x-4">
                {lookbooks.slice(5).map((lookbook, index) => (
                  <Lookbook key={index + 5} data={lookbook} />
                ))}
              </div>
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

export default PublicPosts;
