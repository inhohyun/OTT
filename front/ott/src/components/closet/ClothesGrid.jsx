import { useState, useRef, useEffect } from 'react';
import bingleicon from '../../assets/icons/bingle_bingle_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const ClothesGrid = ({ clothes, onToggleLike, onClothesClick }) => {
  const [visibleItems, setVisibleItems] = useState(12);
  const containerRef = useRef(null);
  const [visibleImages, setVisibleImages] = useState(
    clothes.map((item) => ({ id: item.id, isFront: true }))
  );

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setVisibleItems((prev) => prev + 12);
      }
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
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

  return (
    <div className="relative w-full p-1">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <div onClick={scrollLeft} className="bg-gray-200 p-2 rounded-full">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <div onClick={scrollRight} className="bg-gray-200 p-2 rounded-full">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div
        className="w-full overflow-x-auto p-1 touch-pan-x"
        ref={containerRef}
        style={{
          WebkitOverflowScrolling: 'touch',
          overflowX: 'auto',
          position: 'relative',
          scrollbarWidth: 'none' /* Firefox */,
        }}
      >
        <div
          className="grid grid-flow-col auto-cols-max grid-rows-2 gap-1"
          style={{
            msOverflowStyle: 'none' /* Internet Explorer 10+ */,
            scrollbarWidth: 'none' /* Firefox */,
          }}
        >
          {clothes.slice(0, visibleItems).map((item) => {
            const isFrontVisible = visibleImages.find(
              (image) => image.id === item.id
            )?.isFront;
            return (
              <div
                key={item.id}
                className="flex-none w-52 h-60 p-2 rounded-lg relative flex flex-col items-center cursor-pointer"
                style={{ minWidth: '100px', height: '190px' }}
                onClick={() => onClothesClick(item)}
              >
                <img
                  src={isFrontVisible ? item.frontImage : item.backImage}
                  alt={`${item.category}`}
                  className="w-full h-full rounded-lg shadow-lg"
                />
                {item.backImage && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleImage(item.id);
                    }}
                    className="absolute top-3 right-4 p-1 cursor-pointer"
                  >
                    <img src={bingleicon} alt="Toggle" className="w-4 h-4" />
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
      </div>
      <style>{`
        .w-full::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default ClothesGrid;
