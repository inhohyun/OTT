import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddClothesModal = ({ isOpen, onClose, onAddClothes, categories }) => {
  const [category, setCategory] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [brand, setBrand] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [publicStatus, setPublicStatus] = useState(false); // New field
  const [gender, setGender] = useState(''); // New field
  const [errors, setErrors] = useState({});
  const [showPhotoOptions, setShowPhotoOptions] = useState({
    front: false,
    back: false,
  });

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
      // Define newClothes object with all the necessary data
      const newClothes = {
        id: Date.now(), // Unique identifier
        category,
        frontImage,
        backImage,
        brand,
        purchase: purchaseLocation,
        size,
        color,
        public_status: publicStatus ? 'y' : 'n', // Convert boolean to 'y'/'n'
        gender,
        user_id: 1, // Placeholder, replace with actual user ID management logic
      };

      // Log the input data to the console
      console.log('New clothes data:', newClothes);

      // Call the onAddClothes function with the new clothes data
      onAddClothes(newClothes);

      // Clear the input fields and close the modal
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
  };

  const handleImageSelection = (type, method) => {
    if (method === 'album') {
      document.getElementById(`${type}-file-input`).click();
    } else if (method === 'camera') {
      // Implement camera capture logic here
      alert('Camera capture is not implemented yet.');
    }
    setShowPhotoOptions({ front: false, back: false });
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
            <div className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center">
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="Front"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400">이미지 없음</span>
              )}
            </div>
            <div className="relative">
              <button
                className="w-full mt-2 p-2 bg-violet-400 text-white rounded-lg"
                onClick={() =>
                  setShowPhotoOptions({
                    ...showPhotoOptions,
                    front: !showPhotoOptions.front,
                  })
                }
              >
                사진 선택
              </button>
              {showPhotoOptions.front && (
                <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    className="w-full p-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleImageSelection('front', 'album')}
                  >
                    앨범에서 선택
                  </button>
                  <button
                    className="w-full p-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleImageSelection('front', 'camera')}
                  >
                    사진 촬영
                  </button>
                </div>
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
            <div className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center">
              {backImage ? (
                <img
                  src={backImage}
                  alt="Back"
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400">이미지 없음</span>
              )}
            </div>
            <div className="relative">
              <button
                className="w-full mt-2 p-2 bg-violet-400 text-white rounded-lg"
                onClick={() =>
                  setShowPhotoOptions({
                    ...showPhotoOptions,
                    back: !showPhotoOptions.back,
                  })
                }
              >
                사진 선택
              </button>
              {showPhotoOptions.back && (
                <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    className="w-full p-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleImageSelection('back', 'album')}
                  >
                    앨범에서 선택
                  </button>
                  <button
                    className="w-full p-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleImageSelection('back', 'camera')}
                  >
                    사진 촬영
                  </button>
                </div>
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
    </div>
  );
};

export default AddClothesModal;
