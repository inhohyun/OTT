import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Switch from './Switch';

const SearchInput = ({
  searchQuery, // 검색 쿼리 값
  handleInputChange, // 입력 변화 처리 함수
  isChecked, // 스위치 체크 상태
  handleCheckboxChange, // 스위치 체크 상태 변화 처리 함수
  handleSearch, // 검색 실행 함수
}) => {
  const [inputError, setInputError] = useState('');
  const [isInputValidated, setIsInputValidated] = useState(false);

  // 사용자가 Enter 키를 눌렀을 때 handleSearch 함수를 호출하는 handleKeyPress 함수 정의
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isInputValidated) {
      handleSearch(); // Enter 키를 눌렀을 때 검색 실행
    }
  };

  const handleInputChangeWithValidation = (e) => {
    let value = e.target.value;
    if (!isChecked) {
      const regex = /^[a-zA-Z0-9_]+$/;
      const containsKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);
      if (!containsKorean) {
        if (regex.test(value) && value.length <= 25) {
          setInputError('');
          setIsInputValidated(true);
        } else {
          setInputError(
            '영어, 숫자, _만 입력 가능하며, 최대 길이는 25자입니다.'
          );
          setIsInputValidated(false);
        }
      } else {
        value = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''); // 한글 없애기
        setInputError('영어, 숫자, _만 입력 가능합니다.');
        setIsInputValidated(false);
      }
    } else {
      setInputError('');
      setIsInputValidated(true);
    }
    handleInputChange({ ...e, target: { ...e.target, value } });
  };

  // 컴포넌트의 반환값으로 UI 정의
  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div className="flex items-center w-full">
        {/* 스위치 컴포넌트, 스위치 상태와 변화 핸들러를 props로 전달 */}
        <Switch
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div className="relative flex-grow ml-4">
          {/* 검색 입력 필드, 검색 쿼리와 변화 핸들러, Enter 키 이벤트 핸들러를 설정 */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChangeWithValidation}
            onKeyPress={handleKeyPress}
            placeholder={
              isChecked
                ? '스타일의 태그를 입력하세요' // 스위치가 체크되었을 때
                : '사용자 닉네임을 입력하세요' // 스위치가 체크되지 않았을 때
            }
            className={`border p-2 rounded-full w-full pl-4 ${inputError ? 'border-red-500' : ''}`}
          />
          {/* 검색 아이콘, 클릭 시 handleSearch 함수를 호출 */}
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={isInputValidated ? handleSearch : null}
          />
        </div>
      </div>
      {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
    </div>
  );
};

export default SearchInput;
