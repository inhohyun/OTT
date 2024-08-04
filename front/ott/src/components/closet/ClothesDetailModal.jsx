import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const ClothesDetailModal = ({ isOpen, onClose, clothingItem, onEdit, onDelete, categories = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState(clothingItem);
  const [frontImage, setFrontImage] = useState(clothingItem.image_path[0]);
  const [backImage, setBackImage] = useState(clothingItem.image_path[1]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [category, setCategory] = useState(clothingItem.category || '');

  useEffect(() => {
    if (clothingItem) {
      console.log('Setting editable item and images:', clothingItem);
      setEditableItem(clothingItem);
      setFrontImage(clothingItem.image_path[0]);
      setBackImage(clothingItem.image_path[1]);
      setCategory(clothingItem.category);
    }
  }, [clothingItem]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !clothingItem) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      size: editableItem.size,
      brand: editableItem.brand,
      purchase: editableItem.purchase,
      public_status: editableItem.public_status,
      image_path: [frontImage, backImage],
      color: editableItem.color,
      gender: editableItem.gender,
      category: category,
    };

    console.log('백엔드로 전송:', updatedData);

    onEdit({ ...editableItem, frontImage, backImage, category });
    setIsEditing(false);
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete(editableItem.id);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableItem({ ...editableItem, [name]: value });
  };

  const handleImageChange = (e, setImage) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const getCurrentImage = () => {
    if (currentImageIndex === 0) {
      return frontImage || null;
    }
    return backImage || null;
  };

  const triggerFileInput = () => {
    const input = document.getElementById(`file-input-${currentImageIndex}`);
    if (input) {
      input.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <div className="absolute top-3 right-3 flex space-x-2">
          {!isEditing && (
            <div
              onClick={handleEditClick}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </div>
          )}
          <div
            onClick={() => {
              setIsEditing(false);
              onClose();
            }}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[75vh] p-4">
          <div className="relative flex justify-center mb-4" onClick={isEditing ? triggerFileInput : undefined}>
            <div className="w-40 h-60 rounded-lg overflow-hidden relative cursor-pointer">
              {getCurrentImage() ? (
                <img src={getCurrentImage()} alt="Clothing" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
                  <label className="text-gray-700">{currentImageIndex === 0 ? 'Add Front Image' : 'Add Back Image'}</label>
                </div>
              )}
            </div>
            {(isEditing || (frontImage && backImage)) && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
                  onClick={handlePreviousImage}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
                  onClick={handleNextImage}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            accept="image/*"
            id="file-input-0"
            className="hidden"
            onChange={(e) => handleImageChange(e, setFrontImage)}
          />
          <input
            type="file"
            accept="image/*"
            id="file-input-1"
            className="hidden"
            onChange={(e) => handleImageChange(e, setBackImage)}
          />

          <div className="mb-4">
            {isEditing ? (
              <>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">카테고리</label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-grow p-2 border rounded-lg"
                  >
                    {categories.length > 0 ? categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    )) : (
                      <option value="">카테고리 없음</option>
                    )}
                  </select>
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">브랜드</label>
                  <input
                    type="text"
                    name="brand"
                    value={editableItem.brand}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">사이즈</label>
                  <input
                    type="text"
                    name="size"
                    value={editableItem.size}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">색상</label>
                  <input
                    type="text"
                    name="color"
                    value={editableItem.color}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">구매처</label>
                  <input
                    type="text"
                    name="purchase"
                    value={editableItem.purchase}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">공개 여부</label>
                  <select
                    name="public_status"
                    value={editableItem.public_status}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  >
                    <option value="y">공개</option>
                    <option value="n">비공개</option>
                  </select>
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">성별</label>
                  <select
                    name="gender"
                    value={editableItem.gender}
                    onChange={handleChange}
                    className="flex-grow p-2 border rounded-lg"
                  >
                    <option value="m">남성</option>
                    <option value="f">여성</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>카테고리:</strong> {editableItem.category}
                </p>
                <p>
                  <strong>브랜드:</strong> {editableItem.brand}
                </p>
                <p>
                  <strong>사이즈:</strong> {editableItem.size}
                </p>
                <p>
                  <strong>색상:</strong> {editableItem.color}
                </p>
                <p>
                  <strong>구매처:</strong> 
                  <a
                    href={editableItem.purchase}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {editableItem.purchase}
                  </a>
                </p>
                <p>
                  <strong>공개 여부:</strong> {editableItem.public_status === 'y' ? '공개' : '비공개'}
                </p>
                <p>
                  <strong>성별:</strong> {editableItem.gender === 'm' ? '남성' : '여성'}
                </p>
              </>
            )}
          </div>
          {isEditing && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleSaveClick}
                className="bg-violet-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-stone-400 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesDetailModal;
