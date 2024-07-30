import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomSearchInput = ({
  searchQuery,
  handleInputChange,
  handleSearch,
}) => {
  const handleKeyPress = (e) => {
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
          placeholder="사용자 닉네임을 입력하세요"
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
