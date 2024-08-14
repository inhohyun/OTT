import { useState, useRef, useEffect } from 'react';
import bingleicon from '../../assets/icons/bingle_bingle_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CustomClothesGrid = ({ clothes, onClothesClick, onToggleLike }) => {
  // 처음에 보이는 항목 수
  const [visibleItems, setVisibleItems] = useState(12);
  // 스크롤을 위한 컨테이너 요소의 참조
  const containerRef = useRef(null);
  // 현재 보이는 이미지(앞/뒤)를 추적하는 상태
  const [visibleImages, setVisibleImages] = useState(
    clothes.map((item) => ({ id: item.id, isFront: true }))
  );

  // 컴포넌트가 마운트될 때 스크롤 이벤트 추가
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

  // clothes 데이터가 변경될 때 보이는 이미지를 업데이트
  useEffect(() => {
    setVisibleImages(clothes.map((item) => ({ id: item.id, isFront: true })));
  }, [clothes]);

  // 무한 스크롤을 처리하여 더 많은 항목을 로드
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setVisibleItems((prev) => prev + 12);
      }
    }
  };

  // 왼쪽으로 스크롤 버튼 핸들러
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // 오른쪽으로 스크롤 버튼 핸들러
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // 앞면과 뒷면 이미지를 토글
  const handleToggleImage = (id) => {
    setVisibleImages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFront: !item.isFront } : item
      )
    );
  };

  return (
    <div className="relative w-full p-1">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <div onClick={scrollLeft} className="bg-gray-200 p-2 rounded-full">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
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
          scrollbarWidth: 'none',
        }}
      >
        <div
          className="grid grid-flow-col auto-cols-max grid-rows-1 gap-1"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {clothes.slice(0, visibleItems).map((item, index) => {
            const uniqueKey = item.clothesId !== undefined ? item.clothesId : index;
            const isFrontVisible = visibleImages.find(
              (image) => image.id === uniqueKey
            )?.isFront;

            const frontImage = item.img?.[0] || '';
            const backImage = item.img?.[1] || '';

            return (
              <div
                key={uniqueKey}
                className="flex-none w-52 h-60 p-2 rounded-lg relative flex flex-col items-center cursor-pointer"
                style={{ minWidth: '100px', height: '190px' }}
                onClick={() => onClothesClick(item)}
              >
                <img
                  src={isFrontVisible ? frontImage : backImage}
                  alt={item.category}
                  className="w-full h-full rounded-lg shadow-lg"
                />
                {backImage && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleImage(item.key);
                    }}
                    className="absolute top-3 right-4 p-1 cursor-pointer"
                  >
                    <img src={bingleicon} alt="Toggle" className="w-4 h-4" />
                  </div>
                )}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(item.key);
                  }}
                  className="absolute top-3 left-3 p-1 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={
                      item.bookmarkStatus === 'BOOKMARKING'
                        ? faSolidStar
                        : faRegularStar
                    }
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
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomClothesGrid;
