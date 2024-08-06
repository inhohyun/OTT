import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addClothes } from '../../api/closet/clothes';

const AddClothesModal = ({ isOpen, onClose, onAddClothes, categories }) => {
  const [formData, setFormData] = useState({
    category: '',
    frontImage: '',
    backImage: '',
    brand: '',
    purchaseLocation: '',
    size: '',
    color: '',
    publicStatus: false,
    salesStatus: false,
    gender: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      clearInputs();
    }
  }, [isOpen]);

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({ ...prev, category: categories[0] }));
    }
  }, [categories]);

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.frontImage.trim()) newErrors.frontImage = '앞면 이미지를 선택하세요.';
    if (!formData.brand.trim()) newErrors.brand = '브랜드를 입력하세요.';
    if (!formData.purchaseLocation.trim()) newErrors.purchaseLocation = '구매처를 입력하세요.';
    if (!formData.size.trim()) newErrors.size = '사이즈를 입력하세요.';
    if (!formData.color.trim()) newErrors.color = '색상을 입력하세요.';
    if (!formData.gender.trim()) newErrors.gender = '성별을 선택하세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'black' : provided.borderColor,
      '&:hover': {
        borderColor: 'black',
      },
      boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
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

  const handleAddClothes = () => {
    if (validateInputs()) {
      const data = new FormData();
      data.append('id', Date.now());
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const frontFileInput = document.getElementById('front-file-input');
      const backFileInput = document.getElementById('back-file-input');

      if (frontFileInput?.files[0]) {
        data.append('frontImg', frontFileInput.files[0]);
      }

      if (backFileInput?.files[0]) {
        data.append('backImg', backFileInput.files[0]);
      }

      addClothes(data)
        .then((response) => {
          console.log('Successfully added clothes:', response);
          onAddClothes({ key: response.key });
          clearInputs();
          onClose();
        })
        .catch((error) => {
          console.error('Error adding clothes:', error);
        });
    }
  };

  const clearInputs = () => {
    setFormData({
      category: categories[0],
      frontImage: '',
      backImage: '',
      brand: '',
      purchaseLocation: '',
      size: '',
      color: '',
      publicStatus: false,
      salesStatus: false,
      gender: '',
    });
    setErrors({});
  };

  const handleImageSelection = (type) => {
    document.getElementById(`${type}-file-input`).click();
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, [`${type}Image`]: imageUrl }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const categoryOptions = categories.map((cat) => ({ value: cat, label: cat }));
  const genderOptions = [
    { value: 'MAN', label: '남성' },
    { value: 'WOMAN', label: '여성' },
    { value: 'COMMON', label: '남녀공용' },
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          {['front', 'back'].map((type) => (
            <div key={type}>
              <label className="block text-gray-700 mb-2 text-center">
                {type === 'front' ? '앞면' : '뒷면'}
              </label>
              <div
                className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
                onClick={() => handleImageSelection(type)}
              >
                {formData[`${type}Image`] ? (
                  <img
                    src={formData[`${type}Image`]}
                    alt={type}
                    className="object-cover h-full w-full rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">이미지 추가</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id={`${type}-file-input`}
                onChange={(e) => handleFileChange(e, type)}
                className="hidden"
              />
              {errors[`${type}Image`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`${type}Image`]}</p>
              )}
            </div>
          ))}
        </div>
        {[
          { label: '카테고리', value: formData.category, options: categoryOptions, field: 'category' },
          { label: '브랜드', value: formData.brand, field: 'brand', placeholder: '브랜드를 입력하세요' },
          { label: '구매처', value: formData.purchaseLocation, field: 'purchaseLocation', placeholder: '구매처를 입력하세요' },
          { label: '사이즈', value: formData.size, field: 'size', placeholder: '사이즈를 입력하세요' },
          { label: '색상', value: formData.color, field: 'color', placeholder: '색상을 입력하세요' },
        ].map(({ label, value, options, field, placeholder }, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 mb-2">{label}</label>
            {options ? (
              <Select
                value={options.find((opt) => opt.value === value)}
                onChange={(opt) => handleChange(field, opt.value)}
                options={options}
                styles={customStyles}
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder={placeholder}
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">공개 여부</label>
          <input
            type="checkbox"
            checked={formData.publicStatus}
            onChange={(e) => handleChange('publicStatus', e.target.checked)}
            className="form-checkbox h-5 w-5 text-violet-400"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">판매 여부</label>
          <input
            type="checkbox"
            checked={formData.salesStatus}
            onChange={(e) => handleChange('salesStatus', e.target.checked)}
            className="form-checkbox h-5 w-5 text-violet-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">성별</label>
          <Select
            value={genderOptions.find((opt) => opt.value === formData.gender)}
            onChange={(opt) => handleChange('gender', opt.value)}
            options={genderOptions}
            styles={customStyles}
            placeholder="성별을 선택하세요"
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
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
