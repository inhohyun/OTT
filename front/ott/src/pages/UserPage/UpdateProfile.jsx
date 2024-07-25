import React from 'react';
import backgroundImage from '../../assets/images/background_image_main.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const UpdateProfile = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
        <form className="space-y-6">
          <div className="flex items-center mb-5">
            <label htmlFor="name" className="w-1/4 ml-1 mb-1 font-thin text-lg">이름</label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              maxLength="8"
              className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
            />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor="phone" className="w-1/4 ml-1 mb-1 font-thin text-lg">전화번호</label>
            <input
              type="text"
              id="phone"
              placeholder="01012345678"
              maxLength="11"
              className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
            />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor="nickname" className="w-1/4 ml-1 mb-1 font-thin text-lg">닉네임</label>
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
            <label htmlFor="height" className="w-1/4 ml-1 mb-1 font-thin text-lg">키</label>
            <input
              type="text"
              id="height"
              placeholder="190 cm"
              maxLength="11"
              className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
            />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor="weight" className="w-1/4 ml-1 mb-1 font-thin text-lg">몸무게</label>
            <input
              type="text"
              id="weight"
              placeholder="90 kg"
              maxLength="11"
              className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
            />
          </div>
          <div className="flex items-center mb-5">
            <label htmlFor="bodyType" className="w-1/4 ml-1 mb-1 font-thin text-lg">체형</label>
            <input
              type="text"
              id="bodyType"
              placeholder="보통"
              maxLength="11"
              className="w-3/4 p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400 text-center"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-5 rounded-full mt-5 cursor-pointer text-lg bg-violet-400 text-white hover:bg-violet-300"
            >
              프로필 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
