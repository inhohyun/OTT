import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../../assets/images/background_image_main.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCamera,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import mainIcon from '../../assets/icons/main.logo.png';
import Switch from '../../components/userPage/Switch';
import { updateUserInfo } from '../../api/user/user';
import BodyTypeModal from '../../components/userPage/BodyTypeModal';
import { uploadProfileImg } from '../../api/user/user';

const UpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { memberId, userInfo } = location.state || {
    memberId: null,
    userInfo: {},
  };

  const redirectProfile = () => {
    navigate('/userPage');
  };

  // State 초기화
  const [userInfoState, setUserInfoState] = useState({
    name: userInfo.name || '',
    phone: userInfo.phone || '',
    nickname: userInfo.nickname || '',
    height: userInfo.height || '',
    weight: userInfo.weight || '',
    gender: userInfo.gender || '',
    introduction: userInfo.introduction || '',
  });

  const [bodyType, setBodyType] = useState(userInfo.bodyType || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(
    userInfo.publicStatus !== 'PUBLIC'
  );
  const [profileImage, setProfileImage] = useState(
    userInfo.profileImageUrl || mainIcon
  );
  const [profileImageFile, setProfileImageFile] = useState(null);

  const fileInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const handleBodyTypeSelect = (type) => {
    setBodyType(type);
    onClose();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState(userInfo.tags || []);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setErrorMessage('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === '') return;

    if (tags.includes(searchText.trim())) {
      setErrorMessage('이미 존재하는 태그입니다.');
      return;
    }

    if (tags.length >= 5) {
      setErrorMessage('태그는 최대 5개까지 추가할 수 있습니다.');
      return;
    }

    const newTags = [...tags, searchText.trim()];
    setTags(newTags);
    setSearchText('');
  };

  const handleTagRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 이미지 업로드
  const handleProfileImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await uploadProfileImg(formData);
      return response.data.imageUrl; // 서버에서 반환된 이미지 URL
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return null;
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 저장 클릭 시 동작
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      memberId: memberId,
      nickname: userInfoState.nickname,
      phoneNumber: userInfoState.phone,
      introduction: userInfoState.introduction || '',
      height: parseFloat(userInfoState.height),
      weight: parseFloat(userInfoState.weight),
      gender: userInfoState.gender || null,
      bodyType: bodyType || null,
      publicStatus: isChecked ? 'PUBLIC' : 'PRIVATE',
      memberTags: tags.length > 0 ? tags : null,
    };

    if (profileImageFile) {
      await handleProfileImageUpload(profileImageFile);
    }

    try {
      await updateUserInfo(memberId, updatedUserInfo);
      redirectProfile();
    } catch (error) {
      console.error('Error updating user info:', error);
      setErrorMessage(
        '정보 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.'
      );
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-full min-h-screen bg-cover bg-center font-dohyeon"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full h-full flex flex-col items-center justify-start mb-20">
        <div className="w-full flex justify-center mt-8 relative">
          <div
            className="relative"
            onClick={triggerFileInput}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="w-[70px] h-[70px] rounded-full"
              alt="User Icon"
              src={profileImage}
            />
            <div
              className="absolute bottom-3 left-1/2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center"
              style={{ transform: 'translate(-50%, 0)', zIndex: 1 }}
            >
              {/* <FontAwesomeIcon
                icon={faCamera}
                className="text-purple-600 text-xs"
              /> */}
            </div>
            <input
              type="file"
              id="profileImageInput"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>

        <div className="flex mt-[16px]">
          <Switch
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md mt-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 사용자 정보 입력 필드들 */}
            <div className="flex items-center mb-5">
              <label
                htmlFor="name"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                이름
              </label>

              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                maxLength="8"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfoState.name}
                onChange={(e) =>
                  setUserInfoState({ ...userInfoState, name: e.target.value })
                }
                readOnly
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="phone"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                전화번호
              </label>
              <input
                type="text"
                id="phone"
                placeholder="01012345678"
                maxLength="11"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfoState.phone}
                onChange={(e) =>
                  setUserInfoState({ ...userInfoState, phone: e.target.value })
                }
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="nickname"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                닉네임
              </label>
              <div className="relative flex items-center w-3/4">
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력하세요"
                  maxLength="25"
                  className="w-full p-3 rounded-full border border-violet-300 box-border focus:border-violet-400 pr-10 text-center"
                  value={userInfoState.nickname}
                  onChange={(e) =>
                    setUserInfoState({
                      ...userInfoState,
                      nickname: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="height"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                키
              </label>
              <input
                type="text"
                id="height"
                placeholder="180"
                maxLength="5"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfoState.height}
                onChange={(e) =>
                  setUserInfoState({ ...userInfoState, height: e.target.value })
                }
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="weight"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                몸무게
              </label>
              <input
                type="text"
                id="weight"
                placeholder="70"
                maxLength="5"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfoState.weight}
                onChange={(e) =>
                  setUserInfoState({ ...userInfoState, weight: e.target.value })
                }
              />
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="bodyType"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                체형
              </label>
              <div className="w-3/4 relative">
                <input
                  type="text"
                  id="bodyType"
                  placeholder="선택"
                  className="w-full p-3 rounded-full border border-violet-300 box-border focus:border-violet-400 pr-10 text-center"
                  value={bodyType}
                  onClick={openModal}
                  readOnly
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center mb-5">
              <label
                htmlFor="tags"
                className="w-1/4 ml-1 mb-1 font-thin text-lg"
              >
                태그
              </label>
              <div className="w-3/4 flex flex-wrap items-center">
                <input
                  type="text"
                  id="tagInput"
                  placeholder="태그 추가"
                  maxLength="10"
                  className="flex-1 p-3 mb-2 rounded-full border border-violet-300 box-border focus:border-violet-400 text-center"
                  value={searchText}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit(e);
                    }
                  }}
                />
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-violet-200 text-[rgba(0,0,0,0.5)] py-1 px-3 rounded-full text-sm mb-2 ml-2"
                  >
                    <span>{tag}</span>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="ml-2 text-violet-400 cursor-pointer"
                      onClick={() => handleTagRemove(tag)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-violet-500 text-white py-2 px-4 rounded-full w-full"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* BodyTypeModal 추가 */}
      <BodyTypeModal
        show={isModalOpen}
        onClose={onClose}
        onSelect={handleBodyTypeSelect}
      />
    </div>
  );
};

export default UpdatePage;
