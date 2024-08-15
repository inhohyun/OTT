import { useState, useRef, useEffect } from 'react';
import bingleicon from '@/assets/icons/bingle_bingle_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ClothesGridSingleLine = ({ clothes, onToggleLike, onClothingClick }) => {
  const [visibleItems, setVisibleItems] = useState(12);
  const [selectedItemId, setSelectedItemId] = useState(null); // Only one selected item
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setVisibleItems((prev) => prev + 12);
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

  const handleItemClick = (item) => {
    setSelectedItemId(item.id); // Update to the clicked item ID
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
          return (
            <div
              key={item.id}
              className={`flex-none w-52 h-60 rounded-lg relative flex flex-col items-center`}
              style={{
                minWidth: '180px',
                height: '230px',
                transition: 'background-color 0.3s ease',
                backgroundColor:
                  item.id === selectedItemId
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'transparent',
              }}
              onClick={() => handleItemClick(item)} // Handle item click
            >
              <img
                src={item.img[0]}
                alt={`${item.category}`}
                className={`w-full h-full rounded-lg shadow-lg `}
              />

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
                {/* Like/Unlike logic here */}
              </div>

              {item.id === selectedItemId && (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="absolute bottom-3 right-3 text-green-500"
                  size="lg"
                />
              )}
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
