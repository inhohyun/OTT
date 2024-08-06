import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getClothesItemData, updateClothes } from '../../api/closet/clothes';
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

const ClothesDetailModal = ({
  isOpen,
  onClose,
  clothingItem,
  onEdit,
  onDelete,
  categories,
}) => {
  const [itemDetails, setItemDetails] = useState(clothingItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    setItemDetails(clothingItem);
    setImageFiles(clothingItem?.imageUrls || []);
  }, [clothingItem]);

  useEffect(() => {
    if (clothingItem) {
      const fetchItemDetails = async () => {
        try {
          const data = await getClothesItemData(clothingItem.clothesId);
          console.log(data);
          setItemDetails(data);
          setImageFiles(data.imageUrls || []);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      };

      fetchItemDetails();
    }
  }, [clothingItem]);

  const getGenderText = (gender) => {
    switch (gender) {
      case 'MAN':
        return '남성';
      case 'WOMAN':
        return '여성';
      case 'COMMON':
        return '남녀공용';
      default:
        return '지정되지 않음';
    }
  };

  const getPublicStatusText = (publicStatus) => {
    switch (publicStatus) {
      case 'PUBLIC':
        return '공개';
      case 'PRIVATE':
        return '비공개';
      default:
        return '지정되지 않음';
    }
  };

  const getSalesStatusText = (salesStatus) => {
    switch (salesStatus) {
      case 'ON_SALE':
        return 'O';
      case 'NOT_SALE':
        return 'X';
      default:
        return '지정되지 않음';
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (validateInputs()) {
      try {
        // Prepare data for the PUT request
        const formData = new FormData();
        formData.append('id', itemDetails.clothesId); // Include the ID for reference
        formData.append('size', itemDetails.size);
        formData.append('brand', itemDetails.brand);
        formData.append('purchase', itemDetails.purchase);
        formData.append('category', itemDetails.category);
        formData.append('publicStatus', itemDetails.publicStatus);
        formData.append('salesStatus', itemDetails.salesStatus);
        formData.append('color', itemDetails.color);
        formData.append('gender', itemDetails.gender);

        // Handle image files
        const frontFileInput = document.getElementById('front-file-input');
        const backFileInput = document.getElementById('back-file-input');

        if (frontFileInput && frontFileInput.files[0]) {
          formData.append('frontImg', frontFileInput.files[0]);
        }

        if (backFileInput && backFileInput.files[0]) {
          formData.append('backImg', backFileInput.files[0]);
        }

        // Print the FormData contents to the console
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        // Send PUT request with formData
        const updatedData = await updateClothes(
          itemDetails.clothesId,
          formData
        );

        // Update the component state with the new details
        const updatedDetails = {
          ...itemDetails,
          ...updatedData,
        };
        onEdit(updatedDetails);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating item details:', error);
      }
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setItemDetails({ ...itemDetails, [name]: selectedOption.value });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!itemDetails.brand?.trim()) newErrors.brand = '브랜드를 입력하세요.';
    if (!itemDetails.purchase?.trim())
      newErrors.purchase = '구매처를 입력하세요.';
    if (!itemDetails.size?.trim()) newErrors.size = '사이즈를 입력하세요.';
    if (!itemDetails.color?.trim()) newErrors.color = '색상을 입력하세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleImageSelection = (index) => {
    document.getElementById(`image-file-input-${index}`).click();
  };

  const handleFileChange = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
    }
  };

  const clearImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null; // or set it to an empty string if needed
    setImageFiles(newImageFiles);
  };

  const renderImageInputs = () => {
    const labels = ['앞면', '뒷면'];

    return labels.map((label, index) => (
      <div key={index} className="relative">
        <label className="block text-gray-700 mb-2 text-center">{label}</label>
        <div
          className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
          onClick={() => handleImageSelection(index)}
        >
          {imageFiles[index] ? (
            typeof imageFiles[index] === 'string' ? (
              <img
                src={imageFiles[index]}
                alt={`${label} 이미지`}
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <img
                src={URL.createObjectURL(imageFiles[index])}
                alt={`${label} 이미지`}
                className="object-cover h-full w-full rounded-lg"
              />
            )
          ) : (
            <span className="text-gray-400">이미지 추가</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          id={`image-file-input-${index}`}
          onChange={(e) => handleFileChange(e, index)}
          className="hidden"
        />
        {isEditing && imageFiles[index] && (
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => clearImage(index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="text-red-600" />
          </div>
        )}
      </div>
    ));
  };

  if (!isOpen || !itemDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full">
        <div className="absolute top-3 right-3 flex space-x-2">
          {!isEditing && (
            <div
              onClick={handleToggleEdit}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </div>
          )}
          <div
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[75vh] p-4">
          {isEditing ? (
            <>
              <h2 className="text-xl font-bold mb-4">옷 정보 수정</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {renderImageInputs()}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">브랜드</label>
                <input
                  type="text"
                  name="brand"
                  value={itemDetails.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="브랜드를 입력하세요"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">구매처</label>
                <input
                  type="text"
                  name="purchase"
                  value={itemDetails.purchase}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="구매처를 입력하세요"
                />
                {errors.purchase && (
                  <p className="text-red-500 text-sm mt-1">{errors.purchase}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">사이즈</label>
                <input
                  type="text"
                  name="size"
                  value={itemDetails.size}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="사이즈를 입력하세요"
                />
                {errors.size && (
                  <p className="text-red-500 text-sm mt-1">{errors.size}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">색상</label>
                <input
                  type="text"
                  name="color"
                  value={itemDetails.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="색상을 입력하세요"
                />
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">카테고리</label>
                <Select
                  value={
                    categories.find((opt) => opt === itemDetails.category) || ''
                  }
                  onChange={(opt) => handleSelectChange(opt, 'category')}
                  options={categories.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  styles={customStyles}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">성별</label>
                <Select
                  value={
                    {
                      value: itemDetails.gender,
                      label: getGenderText(itemDetails.gender),
                    } || ''
                  }
                  onChange={(opt) => handleSelectChange(opt, 'gender')}
                  options={[
                    { value: 'MAN', label: '남성' },
                    { value: 'WOMAN', label: '여성' },
                    { value: 'COMMON', label: '남녀공용' },
                  ]}
                  styles={customStyles}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">
                {itemDetails.name || '상세 정보'}
              </h2>
              <div className="relative mb-4">
                {itemDetails.imageUrls && itemDetails.imageUrls.length > 0 ? (
                  <div>
                    <img
                      src={itemDetails.imageUrls[currentImageIndex]}
                      alt={`옷 이미지 ${currentImageIndex + 1}`}
                      className="w-full my-2"
                    />
                    {itemDetails.imageUrls.length > 1 && (
                      <>
                        <div
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                          onClick={() =>
                            setCurrentImageIndex(
                              (currentImageIndex -
                                1 +
                                itemDetails.imageUrls.length) %
                                itemDetails.imageUrls.length
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                          onClick={() =>
                            setCurrentImageIndex(
                              (currentImageIndex + 1) %
                                itemDetails.imageUrls.length
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <p>이미지가 없습니다.</p>
                )}
              </div>
              <p>카테고리: {itemDetails.category || '지정되지 않음'}</p>
              <p>브랜드: {itemDetails.brand || '지정되지 않음'}</p>
              <p>사이즈: {itemDetails.size || '지정되지 않음'}</p>
              <p>색상: {itemDetails.color || '지정되지 않음'}</p>
              <p>구매처: {itemDetails.purchase || '지정되지 않음'}</p>
              <p>성별: {getGenderText(itemDetails.gender)}</p>
              <p>판매 여부: {getSalesStatusText(itemDetails.salesStatus)}</p>
              <p>공개 여부: {getPublicStatusText(itemDetails.publicStatus)}</p>
              <p>즐겨찾기: {itemDetails.isLiked ? '예' : '아니오'}</p>
            </>
          )}
          <div className="flex justify-center mt-4 space-x-4">
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="bg-violet-300 text-white px-4 py-2 rounded-lg"
                >
                  저장
                </button>
                <button
                  onClick={() => onDelete(itemDetails.id)}
                  className="bg-stone-300 text-white px-4 py-2 rounded-lg"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesDetailModal;
