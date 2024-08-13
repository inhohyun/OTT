import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import backgroundImage from '../../assets/images/background_image_main.png';
import useCanvasItems from '../../hooks/useCanvasItems';
import CanvasArea from './CanvasArea';
import FormControls from './FormControls';
import ToggleButton from './ToggleButton';
import { lookbookCreate } from '../../api/lookbook/lookbook';
import useUserStore from '../../data/lookbook/userStore';
import {
  getClosetId,
  getCategory,
  getClothes,
  getAllClothes,
} from '../../api/lookbook/category';

const CreateLookbook = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [description, setDescription] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [closetId, setClosetId] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [allClothes, setAllClothes] = useState([]);

  const categoryRef = useRef(null);
  const userId = useUserStore((state) => state.userId);
  const nav = useNavigate();

  // 옷장 id 조회
  useEffect(() => {
    // const uid = 1;
    const uid = userId;
    const fetchClosetId = async () => {
      try {
        const response = await getClosetId(uid);
        setClosetId(response[0].id);
        console.log('옷장 아이디', response[0].id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClosetId();
  }, []);

  // useEffect(() => {
  //   console.log('옷장 아이디', closetId);
  // }, [closetId]);

  // 카테고리 조회
  useEffect(() => {
    if (closetId === null) return;
    const fetchCategory = async () => {
      try {
        const response = await getCategory(closetId);
        console.log('카테고리', response);
        // setCategories(response.data);
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, [closetId]);

  // // 전체 옷 조회
  // useEffect(() => {
  //   const uid = 1;
  //   const fetchAllClothes = async () => {
  //     try {
  //       const response = await getAllClothes(uid);
  //       console.log('전체', response);
  //       const allClothesData = response.map((item) => {
  //         // console.log('아이템', item);
  //         return {
  //           id: item.clothesId,
  //           image: item.img,
  //         };
  //       });
  //       setAllClothes(allClothesData);
  //       // console.log(allClothesData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAllClothes();
  // }, [userId]);

  // 카테고리 별 옷 조회
  useEffect(() => {
    if (!selectedCategory) return;

    // if (selectedCategory === 'all') {
    //   console.log(allClothes);
    //   setClothes(allClothes);
    //   return;
    // }

    const fetchClothes = async () => {
      // const closetid = 1;
      const closetid = closetId;
      try {
        const response = await getClothes(userId, selectedCategory, closetid);
        // const response = await getClothes(1, selectedCategory, closetid);
        if (Array.isArray(response)) {
          const clothesData = response.map((item) => ({
            id: item.clothId,
            image: item.img[0],
          }));
          // console.log(clothesData);
          setClothes(clothesData);
        } else {
          console.log('응답 데이터가 배열이 아닙니다:', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClothes();
  }, [selectedCategory, userId, allClothes]);

  const {
    canvasItems,
    draggedItem,
    setDraggedItem,
    handleAddToCanvas,
    handleDelete,
    handleMouseDown,
    handleMouseUpOrLeave,
    handleMouseMove,
  } = useCanvasItems();

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : null);
  };

  const handleSave = () => {
    if (tags.length === 0) {
      alert('태그를 입력하세요.');
      return;
    }
    setShowDeleteButton(false);
    setTimeout(() => {
      const canvasArea = document.getElementById('canvasArea');
      html2canvas(canvasArea, { useCORS: true }).then((canvas) => {
        console.log(canvas);
        canvas.toBlob((imageBlob) => {
          if (!imageBlob)
            return console.error('Failed to convert canvas to blob.');

          const selectedImages = canvasItems.map((item) => item.id);
          const formData = new FormData();
          formData.append('memberId', userId);
          // formData.append('memberId', 1);
          formData.append('content', description);
          formData.append('clothes', selectedImages);
          formData.append('tags', tags);
          formData.append('publicStatus', isPublic ? 'PUBLIC' : 'PRIVATE');
          console.log(imageBlob);
          formData.append('img', imageBlob, 'lookbookimage.png');

          // formData.forEach((value, key) => {
          //   console.log(`${key}:`, value);
          // });

          try {
            lookbookCreate(formData);
            console.log('룩북 저장 성공');
            nav(-1);
          } catch (error) {
            console.error(error);
          } finally {
            setShowDeleteButton(true);
          }
        }, 'image/png');
      });
    }, 100);
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      'borderColor': state.isFocused ? 'black' : provided.borderColor,
      'boxShadow': state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
      '&:hover': { borderColor: 'black' },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a78bfa' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const categoryOptions = categories.map((category) => ({
    // value: category.id,
    value: category.categoryId,
    label: category.name,
  }));

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <style>{`.scrollbar-hide {-ms-overflow-style: none; scrollbar-width: none;}.scrollbar-hide::-webkit-scrollbar {display: none;}`}</style>
      <div className="bg-white bg-opacity-60 p-6 rounded-lg shadow-lg w-full max-w-md">
        <ToggleButton
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          handleSave={handleSave}
          buttonLabel="저장"
        />
        <div className="border-2 border-dashed w-full h-72 mb-4">
          <CanvasArea
            canvasItems={canvasItems}
            showDeleteButton={showDeleteButton}
            handleDelete={handleDelete}
            handleMouseDown={handleMouseDown}
            handleTouchStart={handleMouseDown}
            handleMouseMove={(e) =>
              handleMouseMove(
                e,
                document.getElementById('canvasArea').getBoundingClientRect()
              )
            }
            handleMouseUpOrLeave={handleMouseUpOrLeave}
            handleTouchMove={(e) =>
              handleMouseMove(
                e.touches[0],
                document.getElementById('canvasArea').getBoundingClientRect()
              )
            }
            onDrop={(e) => {
              e.preventDefault();
              if (!draggedItem) return;
              handleAddToCanvas(draggedItem);
              setDraggedItem(null);
            }}
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
        <FormControls
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          categoryOptions={categoryOptions}
          customStyles={customStyles}
          clothesData={clothes}
          categoryRef={categoryRef}
          handleAddToCanvas={handleAddToCanvas}
          handleDragStart={setDraggedItem}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          newTag={newTag}
          setNewTag={setNewTag}
          handleKeyDown={handleKeyDown}
          tags={tags}
          handleTagDelete={handleTagDelete}
          description={description}
          setDescription={setDescription}
          canvasItems={canvasItems}
          allClothes={allClothes}
        />
      </div>
    </div>
  );
};

export default CreateLookbook;
