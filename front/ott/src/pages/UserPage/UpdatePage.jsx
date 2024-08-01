import React, { useState } from 'react';
import Modal from 'react-modal';
import backgroundImage from '../../assets/images/background_image_main.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import mainIcon from '../../assets/icons/main.logo.png';
import Switch from '../../components/userPage/Switch';
const UpdatePage = () => {
  const navigate = useNavigate();

  const redirectProfile = () => {
    navigate('/userPage');
  };

  const [bodyType, setBodyType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const handleBodyTypeSelect = (type) => {
    setBodyType(type);
    onClose();
  };

  const handleCheckboxChange = () => {
    // 체크박스 변경 후 처리
    setIsChecked(!isChecked);
  };

  // 태그 추가 기능
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

  return (
    <div className="w-full h-full flex items-center justify-center font-dohyeon mb-40">
      <div
        className="w-full h-screen relative flex flex-col items-center justify-start bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full flex justify-center mt-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            alt="User Icon"
            src={mainIcon}
          />
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
          <form
            className="space-y-6 mb-"
            onSubmit={(e) => {
              e.preventDefault();
              redirectProfile();
            }}
          >
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

            {/* 태그 추가 */}
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
          overlayClassName="modal-overlay" // 오버레이에 클래스 추가
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