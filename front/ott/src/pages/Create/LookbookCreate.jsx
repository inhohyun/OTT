import React, { useState, useRef } from 'react';
import backgroundImage from '../../assets/images/background_image_main.png';
import leftarrow from '../../assets/icons/left_arrow_icon.png';
import rightarrow from '../../assets/icons/right_arrow_icon.png';

const clothesData = {
  상의: [
    {
      id: 1,
      name: 'T-Shirt',
      image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg',
    },
    {
      id: 2,
      name: 'Blouse',
      image:
        'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg',
    },
    // 추가 아이템들
  ],
  하의: [
    {
      id: 1,
      name: 'Jeans',
      image:
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    },
    {
      id: 2,
      name: 'Shorts',
      image:
        'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg',
    },
  ],
  // 다른 카테고리들
};

const LookbookCreate = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [canvasItems, setCanvasItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [description, setDescription] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);

  const categoryRef = useRef(null);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCanvas = (item) => {
    const exists = canvasItems.some(
      (canvasItem) =>
        canvasItem.id === item.id && canvasItem.category === item.category
    );

    if (!exists) {
      setCanvasItems((prevItems) => {
        const uniqueKey = `${item.category}-${item.id}`;
        const x = 10;
        const y = 10;

        return [...prevItems, { ...item, x, y, uniqueKey }];
      });
    }
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const exists = canvasItems.some(
      (canvasItem) =>
        canvasItem.id === draggedItem.id &&
        canvasItem.category === draggedItem.category
    );

    if (!exists) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - 50;
      const y = e.clientY - canvasRect.top - 50;

      setCanvasItems((prevItems) => [
        ...prevItems,
        {
          ...draggedItem,
          x,
          y,
          uniqueKey: `${draggedItem.category}-${draggedItem.id}`,
        },
      ]);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (index) => {
    setDraggedItemIndex(index);
    setIsDragging(true);
    const item = canvasItems[index];
    setInitialPosition({ x: item.x, y: item.y });
  };

  const handleTouchStart = (index) => {
    setDraggedItemIndex(index);
    setIsDragging(true);
    const item = canvasItems[index];
    setInitialPosition({ x: item.x, y: item.y });
  };

  const handleMouseUpOrLeave = () => {
    if (draggedItemIndex !== null && !isDragging) {
      setCanvasItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[draggedItemIndex] = {
          ...newItems[draggedItemIndex],
          ...initialPosition,
        };
        return newItems;
      });
    }
    setDraggedItemIndex(null);
    setIsDragging(false);
    setInitialPosition(null);
  };

  const handleMouseMove = (e) => {
    if (draggedItemIndex === null || !isDragging) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 50;
    const y = e.clientY - canvasRect.top - 50;

    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[draggedItemIndex] = { ...newItems[draggedItemIndex], x, y };
      return newItems;
    });
  };

  const handleTouchMove = (e) => {
    if (draggedItemIndex === null || !isDragging) return;

    const touch = e.touches[0];
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - canvasRect.left - 50;
    const y = touch.clientY - canvasRect.top - 50;

    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[draggedItemIndex] = { ...newItems[draggedItemIndex], x, y };
      return newItems;
    });
  };

  const handleDelete = (index) => {
    setCanvasItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log('Canvas Items:', canvasItems);
    console.log('Tags:', tags);
    console.log('Description:', description);
    console.log('Public:', isPublic);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const scrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft += 100;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      <div className="bg-white bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <div
              className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                isPublic ? 'bg-violet-300' : 'bg-stone-300'
              }`}
              onClick={() => setIsPublic(!isPublic)}
            >
              <div
                className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isPublic ? 'transform translate-x-6' : ''
                }`}
              ></div>
            </div>
            <span className="ml-3 text-sm">{isPublic ? '공개' : '비공개'}</span>
          </div>
          <button
            className="bg-violet-300 text-white py-2 px-4 rounded hover:bg-violet-500 transition"
            onClick={handleSave}
            style={{ fontFamily: 'dohyeon' }}
          >
            저장
          </button>
        </div>
        <div
          className="border-2 border-dashed border-gray-300 w-full h-72 mb-4 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          {canvasItems.map((item, index) => (
            <div
              key={item.uniqueKey}
              className="absolute w-24 h-24"
              style={{
                left: item.x,
                top: item.y,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full cursor-move"
                onMouseDown={() => handleMouseDown(index)}
                onTouchStart={() => handleTouchStart(index)}
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-0 right-0 text-red-500"
                style={{ background: 'none' }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <select
          className="w-full border border-gray-300 text-gray-700 rounded p-2 mb-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          style={{ fontFamily: 'dohyeon' }}
        >
          <option value="">카테고리 선택</option>
          {Object.keys(clothesData).map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <div className="flex items-center gap-2">
            {clothesData[selectedCategory].length > 2 && (
              <button
                onClick={scrollLeft}
                className="p-2"
                style={{ background: 'none' }}
              >
                <img className="w-4 h-4" src={leftarrow} alt="Left Arrow" />
              </button>
            )}
            <div
              ref={categoryRef}
              className="flex overflow-x-auto gap-2 scrollbar-hide"
            >
              {clothesData[selectedCategory].map((item) => {
                const isAdded = canvasItems.some(
                  (canvasItem) =>
                    canvasItem.id === item.id &&
                    canvasItem.category === item.category
                );
                return (
                  <div className="relative" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 cursor-pointer"
                      onClick={() =>
                        handleAddToCanvas({
                          ...item,
                          category: selectedCategory,
                        })
                      }
                      draggable
                      onDragStart={() =>
                        handleDragStart({ ...item, category: selectedCategory })
                      }
                    />
                    {isAdded && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xs">
                        추가됨
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {clothesData[selectedCategory].length > 2 && (
              <button
                onClick={scrollRight}
                className="p-2"
                style={{ background: 'none' }}
              >
                <img className="w-4 h-4" src={rightarrow} alt="Right Arrow" />
              </button>
            )}
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            placeholder="태그를 통해 룩북을 저장하세요."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
            style={{ fontFamily: 'dohyeon' }}
          />
          <div className="flex flex-wrap mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-black text-white rounded px-3 py-1 text-sm mr-2 mb-2 flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleTagDelete(tag)}
                  className="ml-2 text-white bg-transparent border-none cursor-pointer focus:outline-none"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-20">
          <textarea
            placeholder="추가적인 설명이 필요하다면 문구를 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            style={{ fontFamily: 'dohyeon' }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default LookbookCreate;
