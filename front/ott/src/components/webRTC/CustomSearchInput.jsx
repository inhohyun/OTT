import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// 검색어 입력 필드와 검색 아이콘 포함
const CustomSearchInput = ({
  searchQuery,
  handleInputChange,
  handleSearch,
}) => {
  const handleKeyPress = (e) => {
    // enter 키로도 검색 이루어지도록
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full mb-4">
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="거래할 사용자를 검색하세요"
          className="border p-2 rounded-full w-full pl-4"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default CustomSearchInput;
