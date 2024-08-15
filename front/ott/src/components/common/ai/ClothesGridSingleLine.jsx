import React, { useState, useRef, useEffect } from 'react';
import ClothesItem from './ClothesItem'; // ClothesItem 컴포넌트 임포트

const ClothesGridSingleLine = ({
  clothes,
  selectedItemId,
  onClothingClick,
}) => {
  const [visibleItems, setVisibleItems] = useState(12);
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
          const isSelected = selectedItemId === item.id; // 선택된 아이템 확인

          return (
            <ClothesItem
              key={item.id}
              item={item}
              isSelected={isSelected} // 선택 상태 전달
              onClothingClick={onClothingClick} // 클릭 이벤트 전달
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesGridSingleLine;
