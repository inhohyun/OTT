import { useState, useRef, useEffect } from 'react';
import bingleicon from '@/assets/icons/bingle_bingle_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ClothesGridSingleLine = ({ clothes, onToggleLike, onClothingClick }) => {
  const [visibleItems, setVisibleItems] = useState(12); // Adjust this if needed
  const [selectedItemId, setSelectedItemId] = useState(null);
  const containerRef = useRef(null);
  const [visibleImages, setVisibleImages] = useState(
    clothes.map((item) => ({ id: item.id, isFront: true }))
  );

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
    setVisibleImages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFront: !item.isFront } : item
      )
    );
  };

  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
    onClothingClick(item);
  };

  return (
    <div
      className="w-full overflow-x-auto"
      style={{ position: 'relative' }}
      ref={containerRef}
    >
      <div
        className="flex space-x-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {clothes.slice(0, visibleItems).map((item) => {
          const isFrontVisible = visibleImages.find(
            (image) => image.id === item.id
          )?.isFront;
          const isSelected = selectedItemId === item.id;
          return (
            <div
              key={item.id}
              className={`flex-none w-52 h-60 rounded-lg relative flex flex-col items-center ${isSelected ? 'bg-gray-700' : ''}`}
              style={{
                minWidth: '180px',
                height: '230px',
                transition: 'background-color 0.3s ease',
              }} // Adjust the width and height
              onClick={() => handleItemClick(item)} // Handle click event
            >
              <img
                src={isFrontVisible ? item.frontImage : item.backImage}
                alt={`${item.category}`}
                className={`w-full h-full rounded-lg shadow-lg ${isSelected ? 'opacity-50' : ''}`}
              />
              {isSelected && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="absolute text-white"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem',
                  }} // Increase the size
                />
              )}
              {item.backImage && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleImage(item.id);
                  }}
                  className="absolute top-3 right-4 p-1 cursor-pointer"
                >
                  <img src={bingleicon} alt="bingle" className="w-4 h-4" />
                </div>
              )}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(item.id);
                }}
                className="absolute top-3 left-3 p-1 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={item.isLiked ? faSolidStar : faRegularStar}
                  className="w-4 h-4 text-purple-300"
                />
              </div>
            </div>
          );
        })}
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

export default ClothesGridSingleLine;
