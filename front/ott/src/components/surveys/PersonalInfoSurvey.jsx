import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function PersonalInfoSurvey({ formData, setFormData, handleNext }) {
  const [isNicknameValidated, setIsNicknameValidated] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      if (/^[ㄱ-힣]*$/.test(value) || value === '') {
        setNameError('');
        setFormData({ ...formData, [id]: value });
      } else {
        setNameError('한글만 입력 가능합니다.');
      }
    } else if (id === 'phone') {
      if (/^\d*$/.test(value) || value === '') {
        setPhoneError('');
        setFormData({ ...formData, [id]: value });
      } else {
        setPhoneError('숫자만 입력 가능합니다.');
      }
    } else if (id === 'nickname') {
      if (/^[a-zA-Z0-9_]*$/.test(value) || value === '') {
        setNicknameError('');
        setFormData({ ...formData, [id]: value });
      } else {
        setNicknameError('영어, 숫자, _만 입력 가능합니다.');
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
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
            className={`w-4/5 max-w-md p-3 rounded-full border ${nameError ? 'border-red-500' : 'border-violet-300'} mx-auto block box-border focus:border-violet-400`}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
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
            className={`w-4/5 max-w-md p-3 rounded-full border ${phoneError ? 'border-red-500' : 'border-violet-300'} mx-auto block box-border focus:border-violet-400`}
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
              className={`w-full p-3 rounded-full border ${nicknameError ? 'border-red-500' : 'border-violet-300'} box-border focus:border-violet-400 pr-10`}
            />
            <span
              onClick={handleValidateNickname}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          </div>
          {nicknameError && <p className="text-red-500 text-sm mt-1">{nicknameError}</p>}
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
