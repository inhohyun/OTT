/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import AddClothesCategorySelector from './AddClothesCategorySelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import iconImage from '/icon-192x192.png';
import axios from 'axios';
import useUserStore from '../../data/lookbook/userStore';

const AddClothesModal = ({ isOpen, onClose, onAddClothes }) => {
  const memberId = useUserStore((state) => state.userId);
  const [formData, setFormData] = useState({
    categoryId: null,
    frontImg: '',
    backImg: '',
    brand: '',
    purchase: '',
    size: '',
    color: '',
    publicStatus: 'PRIVATE',
    salesStatus: 'NOT_SALE',
    gender: '',
    memberId: memberId,
  });

  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState({
    frontImg: '',
    backImg: '',
  });

  const [isProcessing, setIsProcessing] = useState({
    frontImg: false,
    backImg: false,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      clearInputs();
    }
  }, [isOpen]);

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.frontImg) newErrors.frontImg = '앞면 이미지를 선택하세요.';
    if (!formData.brand.trim()) newErrors.brand = '브랜드를 입력하세요.';
    if (!formData.purchase.trim()) newErrors.purchase = '구매처를 입력하세요.';
    if (!formData.size.trim()) newErrors.size = '사이즈를 입력하세요.';
    if (!formData.color.trim()) newErrors.color = '색상을 입력하세요.';
    if (!formData.gender) newErrors.gender = '성별을 선택하세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClothes = async () => {
    if (!validateInputs()) {
      return;
    }

    const data = new FormData();
    data.append('categoryId', formData.categoryId);
    data.append('brand', formData.brand);
    data.append('purchase', formData.purchase);
    data.append('size', formData.size);
    data.append('color', formData.color);
    data.append('publicStatus', formData.publicStatus);
    data.append('salesStatus', formData.salesStatus);
    data.append('gender', formData.gender);
    data.append('memberId', formData.memberId);

    if (formData.frontImg) {
      data.append('frontImg', formData.frontImg);
    }
    if (formData.backImg) {
      data.append('backImg', formData.backImg);
    }

    try {
      await onAddClothes(data);
      clearInputs();
      onClose();
    } catch (error) {
      console.error('Error adding clothes:', error);
    }
  };

  const clearInputs = () => {
    setFormData({
      categoryId: null,
      frontImg: '',
      backImg: '',
      brand: '',
      purchase: '',
      size: '',
      color: '',
      publicStatus: 'PRIVATE',
      salesStatus: 'NOT_SALE',
      gender: '',
      memberId: memberId,
    });
    setPreviewImages({ frontImg: '', backImg: '' });
    setErrors({});
  };

  const handleImageSelection = (type) => {
    document.getElementById(`${type}-file-input`).click();
  };

  const handleFileChange = async (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({ ...prev, [`${type}Img`]: file }));
      setPreviewImages((prev) => ({ ...prev, [`${type}Img`]: imageUrl }));
      setIsProcessing((prev) => ({ ...prev, [`${type}Img`]: true }));

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          'https://i11c205.p.ssafy.io/rembg',
          formData,
          {
            responseType: 'blob',
          }
        );
        const blob = response.data;
        const processedImageUrl = URL.createObjectURL(blob);

        const processedFile = new File([blob], `${type}.png`, {
          type: 'image/png',
        });
        setFormData((prev) => ({ ...prev, [`${type}Img`]: processedFile }));
        setPreviewImages((prev) => ({
          ...prev,
          [`${type}Img`]: processedImageUrl,
        }));
      } catch (error) {
        console.error('Error processing the image:', error);
      } finally {
        setIsProcessing((prev) => ({ ...prev, [`${type}Img`]: false }));
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (field, checked) => {
    const statusValue =
      field === 'publicStatus'
        ? checked
          ? 'PUBLIC'
          : 'PRIVATE'
        : checked
          ? 'ON_SALE'
          : 'NOT_SALE';
    setFormData((prev) => ({ ...prev, [field]: statusValue }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => ({ ...prev, categoryId: categoryId }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const genderOptions = [
    { value: 'MAN', label: '남성' },
    { value: 'WOMAN', label: '여성' },
    { value: 'COMMON', label: '공용' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full relative overflow-y-auto max-h-full"
        style={{ width: '80%', maxHeight: '75vh' }}
      >
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </div>
        <h2 className="text-xl font-bold mb-4">새 옷 추가하기</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">카테고리</label>
          <AddClothesCategorySelector
            selectedCategory={formData.categoryId}
            onCategoryChange={handleCategoryChange}
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {['front', 'back'].map((type) => (
            <div key={type} className="relative">
              <label className="block text-gray-700 mb-2 text-center">
                {type === 'front' ? '앞면' : '뒷면'}
              </label>
              <div
                className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
                onClick={() => handleImageSelection(type)}
              >
                {previewImages[`${type}Img`] ? (
                  <img
                    src={previewImages[`${type}Img`]}
                    alt={type}
                    className={`object-cover h-full w-full rounded-lg ${isProcessing[`${type}Img`] ? 'blur-sm' : ''}`}
                  />
                ) : (
                  <span className="text-gray-400">이미지 추가</span>
                )}
                {isProcessing[`${type}Img`] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                    <span className="text-white text-lg mb-2">
                      누끼 따는중...
                    </span>
                    <img
                      src={iconImage}
                      alt="Processing Icon"
                      className="w-10 h-10 rounded-full animate-spin"
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id={`${type}-file-input`}
                onChange={(e) => handleFileChange(e, type)}
                className="hidden"
              />
              {errors[`${type}Img`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${type}Img`]}
                </p>
              )}
            </div>
          ))}
        </div>
        {[
          {
            label: '브랜드',
            value: formData.brand,
            field: 'brand',
            placeholder: '브랜드를 입력하세요',
          },
          {
            label: '구매처',
            value: formData.purchase,
            field: 'purchase',
            placeholder: '구매처를 입력하세요',
          },
          {
            label: '사이즈',
            value: formData.size,
            field: 'size',
            placeholder: '사이즈를 입력하세요',
          },
          {
            label: '색상',
            value: formData.color,
            field: 'color',
            placeholder: '색상을 입력하세요',
          },
        ].map(({ label, value, field, placeholder }, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 mb-2">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder={placeholder}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">성별</label>
          <div className="flex items-center space-x-4">
            {genderOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.gender === option.value}
                  onChange={() => handleGenderChange(option.value)}
                  className="form-checkbox h-5 w-5 text-violet-400"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">공개 여부</label>
          <input
            type="checkbox"
            checked={formData.publicStatus === 'PUBLIC'}
            onChange={(e) =>
              handleStatusChange('publicStatus', e.target.checked)
            }
            className="form-checkbox h-5 w-5 text-violet-400"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">판매 여부</label>
          <input
            type="checkbox"
            checked={formData.salesStatus === 'ON_SALE'}
            onChange={(e) =>
              handleStatusChange('salesStatus', e.target.checked)
            }
            className="form-checkbox h-5 w-5 text-violet-400"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAddClothes}
            className="w-32 p-2 bg-violet-400 text-white rounded-lg hover:bg-violet-600"
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClothesModal;
