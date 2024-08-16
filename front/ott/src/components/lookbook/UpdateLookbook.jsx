import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import backgroundImage from '../../assets/images/background_image_main.png';
// import axios from 'axios';
import useCanvasItems from '../../hooks/useCanvasItems';
import CanvasArea from './CanvasArea';
import FormControls from './FormControls';
import ToggleButton from './ToggleButton';
import { lookbookUpdate } from '../../api/lookbook/lookbook';
import shirt1 from '../../assets/images/clothes/shirt1.jpg';
import useUserStore from '../../data/lookbook/userStore';
import {
  getClosetId,
  getCategory,
  getClothes,
  getAllClothes,
} from '../../api/lookbook/category';

const clothesData = {
  상의: [
    {
      id: 1,
      name: 'T-Shirt',
      image: shirt1,
    },
    {
      id: 2,
      name: 'Blouse',
      image:
        'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg',
    },
  ],
  하의: [
    {
      id: 3,
      name: 'Jeans',
      image:
        'https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg',
    },
    {
      id: 4,
      name: 'Shorts',
      image:
        'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg',
    },
  ],
};

const UpdateLookbook = ({ lookbook, lookbookid }) => {
  const [isPublic, setIsPublic] = useState(lookbook.publicStatus !== 'PRIVATE');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(lookbook.tags || []);
  const [newTag, setNewTag] = useState('');
  const [description, setDescription] = useState(lookbook.content || '');
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchClosetId();
  }, [userId]);

  useEffect(() => {
    console.log('옷장 아이디', closetId);
  }, [closetId]);

  // 카테고리 조회
  useEffect(() => {
    if (closetId === null) return;
    const fetchCategory = async () => {
      try {
        const response = await getCategory(closetId);
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
      const closetid = closetId;
      try {
        const response = await getClothes(userId, selectedCategory, closetid);
        if (Array.isArray(response)) {
          const clothesData = await Promise.all(
            response.map(async (item) => {
              try {
                // S3에서 이미지를 가져오고 Blob으로 변환
                const imageResponse = await fetch(item.img[0], {
                  method: 'GET',
                  mode: 'cors', // CORS 모드를 명시
                });

                if (!imageResponse.ok) {
                  throw new Error('Network response was not ok');
                }

                const blob = await imageResponse.blob();
                const url = URL.createObjectURL(blob);

                return {
                  id: item.clothesId,
                  imagePath: item.img[0],
                  image: url,
                };
              } catch (imageError) {
                console.error('이미지 가져오기 실패:', imageError);
                return {
                  id: item.clothesId,
                  image: null, // 이미지 로드 실패 시 null을 설정
                };
              }
            })
          );
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

  const convertUrlToBlob = async (image) => {
    let item = image;
    
    try {
      // S3에서 이미지를 가져오고 Blob으로 변환
      const imageResponse = await fetch(item.imagePath.path, {
        method: 'GET',
        mode: 'cors', // CORS 모드를 명시
      });

      if (!imageResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await imageResponse.blob();
      const url = URL.createObjectURL(blob);

      return {
        id: item.clothesId,
        imagePath: item.imagePath,
        image: url,
      };
    } catch (imageError) {
      console.error('이미지 가져오기 실패:', imageError);
      return {
        id: item.clothesId,
        imagePath: item.imagePath,
        image: null, // 이미지 로드 실패 시 null을 설정
      };
    }
  }

  
  const {
    canvasItems,
    draggedItem,
    setDraggedItem,
    handleAddToCanvas,
    handleDelete,
    handleMouseDown,
    handleMouseUpOrLeave,
    handleMouseMove,
  } = useCanvasItems(
    lookbook.images
      .filter((image) => image.imagePath.itemStatus === 'FRONT') // 'FRONT'인 항목만 선택
      .map((image, index) => (
        {
        ...convertUrlToBlob(image),
        side: 'FRONT', // side 정보를 'FRONT'로 고정
        uniqueKey: `image-${image.clothesId}-FRONT-${index}`, // uniqueKey에 side를 포함
        x: 10 + index * 30,
        y: 10 + index * 30,
      }))
  );

  

  useEffect(() => {
    if (lookbook) {
      setIsPublic(lookbook.publicStatus !== 'PRIVATE');
      setDescription(lookbook.content);
      setTags(lookbook.tags || []);
    }
  }, [lookbook]);

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
      html2canvas(canvasArea, { useCORS: true }).then(async (canvas) => {
        canvas.toBlob(async (imageBlob) => {
          if (!imageBlob)
            return console.error('Failed to convert canvas to blob.');

          const selectedImages = canvasItems.map((item) => item.clothesId);
          const formData = new FormData();
          // formData.append('memberId', 1);
          formData.append('memberId', userId);
          formData.append('content', description);
          formData.append('clothes', selectedImages);
          formData.append('tags', tags);
          formData.append('publicStatus', isPublic ? 'PUBLIC' : 'PRIVATE');
          formData.append('img', imageBlob, 'lookbookimage.png');

          try {
            const data = await lookbookUpdate(formData, lookbookid.id);
            console.log('룩북 수정 성공', data);
            console.log('clothes', selectedImages);
            nav('/userPage', { state: { id: userId } });
          } catch (error) {
            console.error('Error:', error);
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
          buttonLabel="수정"
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
          isPublic={isPublic} // Pass isPublic here
        />
      </div>
    </div>
  );
};

export default UpdateLookbook;
