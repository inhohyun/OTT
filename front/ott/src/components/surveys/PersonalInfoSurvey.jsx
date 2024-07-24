import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function PersonalInfoSurvey({ formData, setFormData, handleNext }) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'nickname') {
      // Only allow English letters, numbers, and underscores
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!regex.test(value)) {
        return; // Do not update the state if the value is invalid
      }
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleValidateNickname = () => {
    // Future validation logic will go here
    console.log(formData.nickname);
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">개인 정보</h2>
      <form onSubmit={handleNext} className="space-y-6">
        <div className="relative mb-5">
          <label htmlFor="name" className="block ml-1 mb-1 font-thin text-lg">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            value={formData.name || ''}
            onChange={handleChange}
            required
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <div className="relative mb-5">
          <label htmlFor="phone" className="block ml-1 mb-1 font-thin text-lg">전화번호</label>
          <input
            type="text"
            id="phone"
            placeholder="-을 뺀 숫자만 입력하세요"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <div className="relative mb-5">
          <label htmlFor="nickname" className="block ml-1 mb-1 font-thin text-lg">닉네임</label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname || ''}
              onChange={handleChange}
              required
              maxLength="25"
              className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
              />
            <span
              onClick={handleValidateNickname}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-violet-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg w-4/5 max-w-md mx-auto block text-center hover:bg-violet-300"
        >
          다음
        </button>
      </form>
    </>
  );
}
