import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/images/background_image_main.png';


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log(searchQuery, '검색중' );
    // Add your search functionality here
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">검색 페이지</h1>
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="검색어를 입력하세요"
            className="border p-2 rounded-full w-full pl-10"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
