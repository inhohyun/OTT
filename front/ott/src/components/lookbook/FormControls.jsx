// import React from 'react';
// import Select from 'react-select';
// import rightarrow from '../../assets/icons/right_arrow_icon.png';
// import leftarrow from '../../assets/icons/left_arrow_icon.png';

// const FormControls = ({
//   selectedCategory,
//   handleCategoryChange,
//   categoryOptions,
//   customStyles,
//   clothesData,
//   categoryRef,
//   handleAddToCanvas,
//   handleDragStart,
//   scrollLeft,
//   scrollRight,
//   newTag,
//   setNewTag,
//   handleKeyDown,
//   tags,
//   handleTagDelete,
//   description,
//   setDescription,
//   canvasItems,
// }) => {
//   return (
//     <>
//       <Select
//         className="mb-2"
//         value={categoryOptions.find(
//           (option) => option.value === selectedCategory
//         )}
//         onChange={handleCategoryChange}
//         options={categoryOptions}
//         styles={customStyles}
//         placeholder="카테고리 선택"
//       />
//       {selectedCategory && clothesData[selectedCategory] && (
//         <div className="flex items-center gap-2">
//           {clothesData[selectedCategory].length > 2 && (
//             <button
//               onClick={scrollLeft}
//               className="p-2"
//               style={{ background: 'none' }}
//             >
//               <img className="w-4 h-4" src={leftarrow} alt="Left Arrow" />
//             </button>
//           )}
//           <div
//             ref={categoryRef}
//             className="flex overflow-x-auto gap-2 mb-2 scrollbar-hide"
//           >
//             {clothesData[selectedCategory].map((item) => {
//               const isAdded = (canvasItems || []).some(
//                 (canvasItem) =>
//                   canvasItem.id === item.id &&
//                   canvasItem.category === selectedCategory
//               );
//               return (
//                 <div className="relative" key={item.id}>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 cursor-pointer"
//                     onClick={() =>
//                       handleAddToCanvas({ ...item, category: selectedCategory })
//                     }
//                     draggable
//                     onDragStart={() =>
//                       handleDragStart({ ...item, category: selectedCategory })
//                     }
//                   />
//                   {isAdded && (
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xs">
//                       추가됨
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//           {clothesData[selectedCategory].length > 2 && (
//             <button
//               onClick={scrollRight}
//               className="p-2"
//               style={{ background: 'none' }}
//             >
//               <img className="w-4 h-4" src={rightarrow} alt="Right Arrow" />
//             </button>
//           )}
//         </div>
//       )}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="태그를 통해 룩북을 저장하세요."
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
//           style={{ fontFamily: 'dohyeon' }}
//           required
//         />
//         <div className="flex flex-wrap mt-2">
//           {tags.map((tag, index) => (
//             <div
//               key={index}
//               className="bg-black text-white rounded px-3 py-1 text-sm mr-2 mb-2 flex items-center"
//             >
//               {tag}
//               <button
//                 onClick={() => handleTagDelete(tag)}
//                 className="ml-2 text-white bg-transparent border-none cursor-pointer focus:outline-none"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mb-20">
//         <textarea
//           placeholder="추가적인 설명이 필요하다면 문구를 입력하세요"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
//           style={{ fontFamily: 'dohyeon' }}
//         ></textarea>
//       </div>
//     </>
//   );
// };

// export default FormControls;

import React from 'react';
import Select from 'react-select';
import rightarrow from '../../assets/icons/right_arrow_icon.png';
import leftarrow from '../../assets/icons/left_arrow_icon.png';

const FormControls = ({
  selectedCategory,
  handleCategoryChange,
  categoryOptions,
  customStyles,
  clothesData,
  categoryRef,
  handleAddToCanvas,
  handleDragStart,
  scrollLeft,
  scrollRight,
  newTag,
  setNewTag,
  handleKeyDown,
  tags,
  handleTagDelete,
  description,
  setDescription,
  canvasItems,
  allClothes,
}) => {
  const clothes = selectedCategory === 'all' ? allClothes : clothesData;

  return (
    <>
      <Select
        className="mb-2"
        value={categoryOptions.find(
          (option) => option.value === selectedCategory
        )}
        onChange={handleCategoryChange}
        options={categoryOptions}
        styles={customStyles}
        placeholder="카테고리 선택"
      />
      {selectedCategory && (
        <div className="flex items-center gap-2">
          {clothes.length === 0 ? (
            <div className="text-center text-gray-500 w-full mb-2">
              선택한 카테고리에 옷이 없습니다.
            </div>
          ) : (
            <>
              {clothes.length > 2 && (
                <button onClick={scrollLeft} style={{ background: 'none' }}>
                  <img className="w-4 h-4" src={leftarrow} alt="Left Arrow" />
                </button>
              )}
              <div
                ref={categoryRef}
                className="flex overflow-x-auto gap-2 mb-2 scrollbar-hide"
              >
                {clothes.map((item) => {
                  const isAdded = (canvasItems || []).some(
                    (canvasItem) =>
                      (canvasItem.id || canvasItem.clothesId) === item.id &&
                      canvasItem.category === selectedCategory
                  );
                  return (
                    <div className="relative" key={item.id}>
                      <img
                        src={(item.image?.path || item.imagePath)}
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
                          handleDragStart({
                            ...item,
                            category: selectedCategory,
                          })
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
              {clothes.length > 2 && (
                <button onClick={scrollRight} style={{ background: 'none' }}>
                  <img className="w-4 h-4" src={rightarrow} alt="Right Arrow" />
                </button>
              )}
            </>
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
          required
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
    </>
  );
};

export default FormControls;
