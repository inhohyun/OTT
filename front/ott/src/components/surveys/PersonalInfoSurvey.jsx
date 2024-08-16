import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function PersonalInfoSurvey({
  formData,
  setFormData,
  handleNext,
}) {
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
      if (/^[a-zA-Z0-9_]+$/.test(value) && value.length <= 25) {
        setNicknameError('');
        setIsNicknameValidated(true);
      } else {
        setNicknameError(
          '영어, 숫자, _만 입력 가능하며, 최대 길이는 25자입니다.'
        );
        setIsNicknameValidated(false);
      }
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleValidateNickname = () => {
    // console.log(formData.nickname);
    // Nickname validation is already handled in handleChange, this function is kept for demonstration or additional future checks.
  };

  const handleCardClick = (type) => {
    setFormData({ ...formData, gender: type });
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">
        개인 정보
      </h2>
      <form onSubmit={handleNext} className="space-y-6">
        <div className="relative mb-5">
          <label htmlFor="name" className="block ml-1 mb-1 font-thin text-lg">
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            value={formData.name || ''}
            onChange={handleChange}
            required
            maxLength="8"
            className={`w-4/5 max-w-md p-3 rounded-full border ${
              nameError ? 'border-red-500' : 'border-violet-300'
            } mx-auto block box-border focus:border-violet-400`}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
        <div className="relative mb-5">
          <label htmlFor="phone" className="block ml-1 mb-1 font-thin text-lg">
            전화번호
          </label>
          <input
            type="text"
            id="phone"
            placeholder="-을 뺀 숫자만 입력하세요"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            maxLength="11"
            className={`w-4/5 max-w-md p-3 rounded-full border ${
              phoneError ? 'border-red-500' : 'border-violet-300'
            } mx-auto block box-border focus:border-violet-400`}
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>
        <div className="relative mb-10">
          <label className="block ml-1 mb-5 font-thin text-lg">성별</label>
          <div className="grid grid-cols-2 gap-4">
            {['남성', '여성'].map((type) => (
              <div
                key={type}
                onClick={() => handleCardClick(type)}
                className={`cursor-pointer p-4 rounded-lg border text-center text-stone-400 ${
                  formData.gender === type ? 'bg-violet-200' : ''
                }`}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
        <div className="relative mb-5 ">
          <label
            htmlFor="nickname"
            className="block ml-1 mb-1 font-thin text-lg"
          >
            닉네임
          </label>
          <div className="relative flex items-center w-4/5 max-w-md mx-auto">
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname || ''}
              onChange={handleChange}
              required
              maxLength="25"
              className={`w-full p-3 rounded-full border ${
                nicknameError ? 'border-red-500' : 'border-violet-300'
              } box-border focus:border-violet-400 pr-10`}
            />
            <span
              onClick={handleValidateNickname}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: isNicknameValidated ? '#7c3aed' : '#d1d5db' }} // Violet color when validated, gray otherwise
              />
            </span>
          </div>
          {nicknameError && (
            <p className="text-red-500 text-sm mt-1">{nicknameError}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isNicknameValidated}
            className={`py-2 px-5 rounded-full mt-5 cursor-pointer text-lg ${
              isNicknameValidated
                ? 'bg-violet-400 text-white hover:bg-violet-300'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>
      </form>
    </>
  );
}
