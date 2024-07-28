import { useState, useRef, useEffect } from 'react';
import bingleicon from '../../assets/icons/bingle_bingle_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

const ClothesGrid = ({ clothes, onAddClothes }) => {
  const [visibleItems, setVisibleItems] = useState(12); // Adjust this if needed
  const containerRef = useRef(null);
  const [visibleImages, setVisibleImages] = useState(clothes.map(item => ({ id: item.id, isFront: true })));
  const [likedItems, setLikedItems] = useState(clothes.map(item => ({ id: item.id, isLiked: false })));

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setVisibleItems((prev) => prev + 12); // Load more items as you scroll
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleToggleImage = (id) => {
    setVisibleImages(prev =>
      prev.map(item => item.id === id ? { ...item, isFront: !item.isFront } : item)
    );
  };

  const handleToggleLike = (id) => {
    setLikedItems(prev =>
      prev.map(item => item.id === id ? { ...item, isLiked: !item.isLiked } : item)
    );
  };

  return (
    <div className="w-full overflow-x-auto p-1" style={{ position: 'relative' }} ref={containerRef}>
      <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {clothes.slice(0, visibleItems).map((item) => {
          const isFrontVisible = visibleImages.find(image => image.id === item.id)?.isFront;
          const isLiked = likedItems.find(like => like.id === item.id)?.isLiked;
          return (
            <div 
              key={item.id} 
              className="flex-none w-52 h-60 p-2 rounded-lg relative flex flex-col items-center" 
              style={{ minWidth: '180px', height: '230px' }} // Adjust the width and height
            >
              <img
                src={isFrontVisible ? item.frontImage : item.backImage}
                alt={`${item.category}`}
                className="w-full h-full rounded-lg shadow-lg"
              />
              {item.backImage && (
                <div
                  onClick={() => handleToggleImage(item.id)}
                  className="absolute top-3 right-4 p-1 cursor-pointer"
                >
                  <img src={bingleicon} alt="bingle" className="w-4 h-4" />
                </div>
              )}
              <div
                onClick={() => handleToggleLike(item.id)}
                className="absolute top-3 left-3 p-1 cursor-pointer"
              >
                <FontAwesomeIcon icon={isLiked ? faSolidStar : faRegularStar} className="w-4 h-4 text-purple-300" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={onAddClothes}
          className="p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600 flex items-center justify-center"
        >
          + 옷 추가하기
        </button>
      </div>
      <style>
        {`
          .w-full {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .w-full::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default ClothesGrid;
