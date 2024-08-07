import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Switch from './Switch'; // Adjust the import path as necessary
const SearchInput = ({
  searchQuery, // 검색 쿼리 값
  handleInputChange, // 입력 변화 처리 함수
  isChecked, // 스위치 체크 상태
  handleCheckboxChange, // 스위치 체크 상태 변화 처리 함수
  handleSearch, // 검색 실행 함수
}) => {
  // 사용자가 Enter 키를 눌렀을 때 handleSearch 함수를 호출하는 handleKeyPress 함수 정의
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Enter 키를 눌렀을 때 검색 실행
    }
  };

  // 컴포넌트의 반환값으로 UI 정의
  return (
    <div className="flex items-center w-full mb-4">
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
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={
            isChecked
              ? '스타일의 태그를 입력하세요' // 스위치가 체크되었을 때
              : '사용자 닉네임을 입력하세요' // 스위치가 체크되지 않았을 때
          }
          className="border p-2 rounded-full w-full pl-4"
        />
        {/* 검색 아이콘, 클릭 시 handleSearch 함수를 호출 */}
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchInput;
