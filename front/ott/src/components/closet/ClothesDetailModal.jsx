import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CameraCapture from './CameraCapture';

const ClothesDetailModal = ({ isOpen, onClose, clothingItem, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState(clothingItem);
  const [frontImage, setFrontImage] = useState(clothingItem.frontImage);
  const [backImage, setBackImage] = useState(clothingItem.backImage);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCameraCapture, setShowCameraCapture] = useState(false);

  useEffect(() => {
    if (clothingItem) {
      setEditableItem(clothingItem);
      setFrontImage(clothingItem.frontImage);
      setBackImage(clothingItem.backImage);
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
    };

    console.log('Sending updated data to the backend:', updatedData);

    onEdit({ ...editableItem, frontImage, backImage });
    setIsEditing(false);
    onClose();
  };

  const handleDeleteClick = () => {
    console.log('Deleting item with ID:', editableItem.id);
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePreviousImage = () => {
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
    } else {
      console.error(`File input with ID 'file-input-${currentImageIndex}' not found`);
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
          <div className="relative flex justify-center mb-4">
            <div className="w-40 h-60 rounded-lg overflow-hidden relative">
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

          {isEditing && (
            <div className="flex justify-center mb-4 space-x-4">
              <button
                className="bg-white bg-opacity-75 text-gray-700 px-2 py-1 rounded-lg"
                onClick={triggerFileInput}
              >
                앨범에서 선택
              </button>
              <button
                className="bg-white bg-opacity-75 text-gray-700 px-2 py-1 rounded-lg"
                onClick={() => setShowCameraCapture(true)}
              >
                촬영하기
              </button>
            </div>
          )}

          {showCameraCapture && (
            <CameraCapture
              onCapture={(img) => {
                if (currentImageIndex === 0) {
                  setFrontImage(img);
                } else {
                  setBackImage(img);
                }
                setShowCameraCapture(false);
              }}
              onCancel={() => setShowCameraCapture(false)}
            />
          )}

          <div className="mb-4">
            {isEditing ? (
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
            ) : (
              <p>
                <strong>브랜드:</strong> {editableItem.brand}
              </p>
            )}
            {isEditing ? (
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
            ) : (
              <p>
                <strong>사이즈:</strong> {editableItem.size}
              </p>
            )}
            {isEditing ? (
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
            ) : (
              <p>
                <strong>색상:</strong> {editableItem.color}
              </p>
            )}
            {isEditing ? (
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
            ) : (
              <p>
                <strong>구매처:</strong>{' '}
                <a
                  href={editableItem.purchase}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {editableItem.purchase}
                </a>
              </p>
            )}
            {isEditing ? (
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
            ) : (
              <p>
                <strong>공개 여부:</strong>{' '}
                {editableItem.public_status === 'y' ? 'Public' : 'Private'}
              </p>
            )}
            {isEditing ? (
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
            ) : (
              <p>
                <strong>성별:</strong>{' '}
                {editableItem.gender === 'm' ? '남성' : '여성'}
              </p>
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
