import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      clearInputs(); // input값 초기화
    }
  }, [isOpen]);

  // 최초 카테고리를 가장 상단에 위치한 카테고리로 기본값 설정
  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]);
    }
  }, [categories]);

  // 추가하고자 하는 옷의 input들
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

  // 옷 추가 함수
  const handleAddClothes = () => {
    // 유효성 검사 통과했으면
    if (validateInputs()) {
      // 옷의 고유 id 생성(서버 시간으로) -> 백엔드와 논의 후 변경
      const id = Date.now();
      // 새로운 옷에 대한 정보
      const newClothes = {
        id,
        size,
        brand,
        purchase: purchaseLocation,
        category,
        public_status: publicStatus ? 'y' : 'n',
        // 이미지는 2장까지... 앞면 필수, 뒷면은 선택이라 list의 0번 idx 항목 === 앞면 사진
        image_path: backImage ? [frontImage, backImage] : [frontImage],
        color,
        gender,
        user_id: 1,
      };

      // 벡엔드로 보내지는 값 확인
      console.log('새로운 옷 정보:', newClothes);

      // axios 요청 예시
      /*
      axios.post('/clothes', newClothes)
        .then(response => {
          console.log('Successfully added clothes:', response.data);
          onAddClothes({ ...newClothes, key: response.data.key });
          clearInputs();
          onClose();
        })
        .catch(error => {
          console.error('옷 추가 과정에서 오류 발생:', error);
        });
      */

      onAddClothes(newClothes);
      clearInputs();
      onClose();
    }
  };

  // d옷 추가 input들 초기화
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

  // 이미지 추가 과정 함수... 빈 공백 클릭 시 실행
  const handleImageSelection = (type) => {
    document.getElementById(`${type}-file-input`).click();
  };

  // 기존에 추가했던 파일 변경
  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      // 임의의 이미지 url 생성
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
    </div>
  );
};

export default AddClothesModal;
