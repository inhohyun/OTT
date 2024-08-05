import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const ClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  onDelete,
  categories = [],
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableItem, setEditableItem] = useState(clothingItem || {});
  const [frontImage, setFrontImage] = useState(clothingItem?.img?.[0] || '');
  const [backImage, setBackImage] = useState(clothingItem?.img?.[1] || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [category, setCategory] = useState(clothingItem?.category || '');
  const [publicStatus, setPublicStatus] = useState(
    clothingItem?.publicStatus || 'PRIVATE'
  );
  const [salesStatus, setSalesStatus] = useState(
    clothingItem?.salesStatus || 'NOT_SALE'
  );
  const [gender, setGender] = useState(clothingItem?.gender || 'COMMON');

  useEffect(() => {
    if (clothingItem) {
      console.log('Editing clothing item:', clothingItem);
      setEditableItem(clothingItem);
      setFrontImage(clothingItem.img?.[0] || '');
      setBackImage(clothingItem.img?.[1] || '');
      setCategory(clothingItem.category);
      setPublicStatus(clothingItem.publicStatus || 'PRIVATE');
      setSalesStatus(clothingItem.salesStatus || 'NOT_SALE');
      setGender(clothingItem.gender || 'COMMON');
    }
  }, [clothingItem]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen || !clothingItem) return null;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      'borderColor': state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black',
      },
      'boxShadow': state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a78bfa' : 'white',
      color: state.isSelected ? 'white' : 'black',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      ...editableItem,
      category,
      publicStatus,
      salesStatus,
      gender,
      img: [frontImage, backImage],
    };

    console.log('Saving edited data to backend:', updatedData);

    onEdit(updatedData);
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
    return currentImageIndex === 0 ? frontImage : backImage;
  };

  const triggerFileInput = () => {
    const input = document.getElementById(`file-input-${currentImageIndex}`);
    if (input) {
      input.click();
    }
  };

  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));
  const publicOptions = [
    { value: 'PUBLIC', label: '공개' },
    { value: 'PRIVATE', label: '비공개' },
  ];
  const salesOptions = [
    { value: 'ON_SALE', label: '판매 중' },
    { value: 'NOT_SALE', label: '판매 안 함' },
  ];
  const genderOptions = [
    { value: 'MAN', label: '남성' },
    { value: 'WOMAN', label: '여성' },
    { value: 'COMMON', label: '남녀공용' },
  ];

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
          <div
            className="relative flex justify-center mb-4"
            onClick={isEditing ? triggerFileInput : undefined}
          >
            <div className="w-40 h-60 rounded-lg overflow-hidden relative cursor-pointer">
              {getCurrentImage() ? (
                <img
                  src={getCurrentImage()}
                  alt="Clothing"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
                  <label className="text-gray-700">
                    {currentImageIndex === 0
                      ? 'Add Front Image'
                      : 'Add Back Image'}
                  </label>
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

          {/* Hidden file inputs for image upload */}
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
                  <Select
                    value={categoryOptions.find(
                      (opt) => opt.value === category
                    )}
                    onChange={(opt) => setCategory(opt.value)}
                    options={categoryOptions}
                    styles={customStyles}
                  />
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
                  <Select
                    value={publicOptions.find(
                      (opt) => opt.value === publicStatus
                    )}
                    onChange={(opt) => setPublicStatus(opt.value)}
                    options={publicOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">판매 여부</label>
                  <Select
                    value={salesOptions.find(
                      (opt) => opt.value === salesStatus
                    )}
                    onChange={(opt) => setSalesStatus(opt.value)}
                    options={salesOptions}
                    styles={customStyles}
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2 w-24">성별</label>
                  <Select
                    value={genderOptions.find((opt) => opt.value === gender)}
                    onChange={(opt) => setGender(opt.value)}
                    options={genderOptions}
                    styles={customStyles}
                  />
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
                  <strong>구매처:</strong>{' '}
                  <a
                    href={editableItem.purchase}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {editableItem.purchase}
                  </a>
                </p>
                <p>
                  <strong>공개 여부:</strong>{' '}
                  {publicStatus === 'PUBLIC' ? '공개' : '비공개'}
                </p>
                <p>
                  <strong>판매 여부:</strong>{' '}
                  {salesStatus === 'ON_SALE' ? '판매 중' : '판매 안 함'}
                </p>
                <p>
                  <strong>성별:</strong>{' '}
                  {gender === 'MAN'
                    ? '남성'
                    : gender === 'WOMAN'
                      ? '여성'
                      : '남녀공용'}
                </p>
              </>
            )}
          </div>
          {isEditing && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleSaveClick}
                className="bg-violet-300 text-white px-4 py-2 rounded-lg"
              >
                저장
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-stone-400 text-white px-4 py-2 rounded-lg"
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
