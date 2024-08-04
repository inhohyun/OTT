import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CameraCapture from './CameraCapture';

const AddClothesModal = ({ isOpen, onClose, onAddClothes, categories }) => {
  const [category, setCategory] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [brand, setBrand] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [publicStatus, setPublicStatus] = useState(false);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [cameraType, setCameraType] = useState(null); // State to track which image (front or back) the camera is capturing
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to control camera visibility

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      clearInputs(); // Clear inputs when the modal is closed
    }
  }, [isOpen]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]);
    }
  }, [categories]);

  const validateInputs = () => {
    const newErrors = {};
    if (!frontImage.trim()) newErrors.frontImage = '앞면 이미지를 선택하세요.';
    if (!brand.trim()) newErrors.brand = '브랜드를 입력하세요.';
    if (!purchaseLocation.trim())
      newErrors.purchaseLocation = '구매처를 입력하세요.';
    if (!size.trim()) newErrors.size = '사이즈를 입력하세요.';
    if (!color.trim()) newErrors.color = '색상을 입력하세요.';
    if (!gender.trim()) newErrors.gender = '성별을 선택하세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddClothes = () => {
    if (validateInputs()) {
      const id = Date.now();
      const newClothes = {
        id,
        size,
        brand,
        purchase: purchaseLocation,
        public_status: publicStatus ? 'y' : 'n',
        image_path: backImage ? [frontImage, backImage] : [frontImage],
        color,
        gender,
        user_id: 1,
      };

      console.log('New clothes data:', newClothes);

      // Example of an API call to add clothes
      /*
      axios.post('/clothes', newClothes)
        .then(response => {
          console.log('Successfully added clothes:', response.data);
          onAddClothes({ ...newClothes, key: response.data.key });
          clearInputs();
          onClose();
        })
        .catch(error => {
          console.error('There was an error adding the clothes:', error);
        });
      */

      onAddClothes(newClothes);
      clearInputs();
      onClose();
    }
  };

  const clearInputs = () => {
    setCategory(categories[0]);
    setFrontImage('');
    setBackImage('');
    setBrand('');
    setPurchaseLocation('');
    setSize('');
    setColor('');
    setPublicStatus(false);
    setGender('');
    setErrors({});
    setIsCameraOpen(false);
  };

  const handleImageSelection = (type) => {
    document.getElementById(`${type}-file-input`).click();
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      if (type === 'front') {
        setFrontImage(imageUrl);
      } else if (type === 'back') {
        setBackImage(imageUrl);
      }
    }
  };

  const handleCapture = (imageUrl) => {
    if (cameraType === 'front') {
      setFrontImage(imageUrl);
    } else if (cameraType === 'back') {
      setBackImage(imageUrl);
    }
    setIsCameraOpen(false);
  };

  const handleCancelCamera = () => {
    setIsCameraOpen(false);
  };

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
          <div>
            <label className="block text-gray-700 mb-2 text-center">앞면</label>
            <div
              className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
              onClick={() => handleImageSelection('front')}
            >
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="Front"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400">이미지 추가</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="front-file-input"
              onChange={(e) => handleFileChange(e, 'front')}
              className="hidden"
            />
            {errors.frontImage && (
              <p className="text-red-500 text-sm mt-1">{errors.frontImage}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-center">뒷면</label>
            <div
              className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer"
              onClick={() => handleImageSelection('back')}
            >
              {backImage ? (
                <img
                  src={backImage}
                  alt="Back"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400">이미지 추가</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="back-file-input"
              onChange={(e) => handleFileChange(e, 'back')}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">브랜드</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
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
            value={purchaseLocation}
            onChange={(e) => setPurchaseLocation(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="구매처를 입력하세요"
          />
          {errors.purchaseLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.purchaseLocation}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">사이즈</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
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
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="색상을 입력하세요"
          />
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-2">공개 여부</label>
          <input
            type="checkbox"
            checked={publicStatus}
            onChange={(e) => setPublicStatus(e.target.checked)}
            className="form-checkbox h-5 w-5 text-violet-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">성별</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">성별을 선택하세요</option>
            <option value="m">남성</option>
            <option value="f">여성</option>
          </select>
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
      {isCameraOpen && (
        <CameraCapture onCapture={handleCapture} onCancel={handleCancelCamera} />
      )}
    </div>
  );
};

export default AddClothesModal;
