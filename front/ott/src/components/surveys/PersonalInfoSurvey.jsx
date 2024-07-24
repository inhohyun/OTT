import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function PersonalInfoSurvey({ formData, setFormData, handleNext }) {
  const [isNicknameValidated, setIsNicknameValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      // Only allow Korean characters and set max length to 8
      const regex = /^[가-힣]{0,8}$/;
      if (!regex.test(value)) {
        return; // Do not update the state if the value is invalid
      }
    } else if (id === 'phone') {
      // Only allow numbers and set max length to 11
      const regex = /^\d{0,11}$/;
      if (!regex.test(value)) {
        return; // Do not update the state if the value is invalid
      }
    } else if (id === 'nickname') {
      // Only allow English letters, numbers, and underscores
      const regex = /^[a-zA-Z0-9_]*$/;
      if (!regex.test(value)) {
        return; // Do not update the state if the value is invalid
      }
    }

    setFormData({ ...formData, [id]: value });
    setIsNicknameValidated(false); // Reset validation status on input change
  };

  const handleValidateNickname = () => {
    // Future validation logic will go here
    console.log(formData.nickname);
    // For now, assume validation is always successful
    setIsNicknameValidated(true);
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
            maxLength="8"
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
            maxLength="11"
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <div className="relative mb-5 ">
          <label htmlFor="nickname" className="block ml-1 mb-1 font-thin text-lg">닉네임</label>
          <div className="relative flex items-center w-4/5 max-w-md mx-auto">
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname || ''}
              onChange={handleChange}
              required
              maxLength="25"
              className="w-full p-3 rounded-full border border-violet-300 box-border focus:border-violet-400 pr-10"
            />
            <span
              onClick={handleValidateNickname}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isNicknameValidated}
            className={`py-2 px-5 rounded-full mt-5 cursor-pointer text-lg ${isNicknameValidated ? 'bg-violet-400 text-white hover:bg-violet-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            다음
          </button>
        </div>
      </form>
    </>
  );
}
