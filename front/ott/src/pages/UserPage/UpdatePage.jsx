import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import backgroundImage from '../../assets/images/background_image_main.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faSearch,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import mainIcon from '../../assets/icons/main.logo.png';
import Switch from '../../components/userPage/Switch';
// import { getUserInfo, updateUserInfo } from '../../api/user/user';

const UpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  const redirectProfile = () => {
    navigate('/userPage');
  };

  const [bodyType, setBodyType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [profileImage, setProfileImage] = useState(mainIcon);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    nickname: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // const response = await getUserInfo(userId);
        // setUserInfo(response.data);
        // setProfileImage(response.data.profileImage || mainIcon);

        // 더미 데이터 설정
        const dummyData = {
          name: '홍길동',
          phone: '01012345678',
          nickname: '길동이',
          height: '180 cm',
          weight: '70 kg',
          profileImage: mainIcon,
        };
        setUserInfo(dummyData);
        setProfileImage(dummyData.profileImage || mainIcon);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

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
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setErrorMessage('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() === '') {
      return;
    }
    if (tags.includes(searchText.trim())) {
      setErrorMessage('이미 존재하는 태그입니다.');
      return;
    }
    if (tags.length >= 5) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      memberId: userId,
      nickname: userInfo.nickname,
      phoneNumber: userInfo.phone,
      profileImageUrl: profileImage,
      height: parseFloat(userInfo.height),
      weight: parseFloat(userInfo.weight),
      bodyType,
      publicStatus: isChecked ? 'PUBLIC' : 'PRIVATE',
      memberTags: tags,
    };
    try {
      // await updateUserInfo(userId, updateData);
      console.log('Update data:', updateData); // 더미 데이터 출력
      redirectProfile();
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center font-dohyeon mb-40">
      <div
        className="w-full h-screen relative flex flex-col items-center justify-start bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
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
              className="absolute bottom-2 left-1/2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center"
              style={{ transform: 'translate(-50%, 0)', zIndex: 1 }}
            >
              <FontAwesomeIcon
                icon={faCamera}
                className="text-purple-600 text-xs"
              />
            </div>
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>

        <div className="flex mr-[40px] mt-[16px]">
          <Switch
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          />
          <p className="text-lg font-dohyeon text-[rgba(0,0,0,0.5)] mt-[7px] ml-[5px]">
            mediamodifier
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md mt-6">
          <form className="space-y-6 mb-" onSubmit={handleSubmit}>
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
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
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
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
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
                  placeholder="차정준"
                  maxLength="25"
                  className="w-full p-3 rounded-full border border-violet-300 box-border focus:border-violet-400 pr-10 text-center"
                  value={userInfo.nickname}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, nickname: e.target.value })
                  }
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
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
                placeholder="190 cm"
                maxLength="11"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfo.height}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, height: e.target.value })
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
                placeholder="90 kg"
                maxLength="11"
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
                value={userInfo.weight}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, weight: e.target.value })
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
              <input
                type="text"
                id="bodyType"
                value={bodyType}
                readOnly
                onClick={openModal}
                className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center cursor-pointer"
              />
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl mb-5 text-gray-800 font-thin">
                선호하는 스타일{' '}
                <span className="text-sm text-[10px] text-stone-400">
                  (최대 5개)
                </span>
              </h4>
              <div className="relative mb-2 flex justify-between items-center">
                <input
                  type="text"
                  id="style"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="검색할 스타일을 입력하세요"
                  className="w-full p-2 rounded-full border border-violet-300 box-border focus:border-violet-400"
                />
                <span
                  onClick={handleSearchSubmit}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-violet-400 text-white px-3 py-1 rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      className="ml-2 bg-violet-400 text-white"
                      onClick={() => handleTagRemove(tag)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                className="py-2 px-5 rounded-full mt-5 cursor-pointer text-lg bg-violet-400 text-white hover:bg-violet-300"
              >
                프로필 수정
              </button>
            </div>
          </form>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={onClose}
          contentLabel="체형 선택"
          ariaHideApp={false}
          className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50"
          overlayClassName="modal-overlay"
        >
          <div id="modal-overlay" onClick={onClose}>
            <div className="relative bg-white p-8 rounded-lg shadow-md">
              <p
                onClick={onClose}
                className="text-lg font-bold cursor-pointer w-8 h-8 absolute right-0 top-5"
              >
                &times;
              </p>
              <h2 className="text-xl font-bold mb-4">당신의 체형은?</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <button
                  onClick={() => handleBodyTypeSelect('슬림')}
                  className="p-4 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  슬림
                </button>
                <button
                  onClick={() => handleBodyTypeSelect('슬림 탄탄')}
                  className="p-4 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  슬림 탄탄
                </button>
                <button
                  onClick={() => handleBodyTypeSelect('보통')}
                  className="p-4 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  보통
                </button>
                <button
                  onClick={() => handleBodyTypeSelect('통통')}
                  className="p-4 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  통통
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UpdatePage;
