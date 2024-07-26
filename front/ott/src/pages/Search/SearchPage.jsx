import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/images/background_image_main.png';
import Switch from './Switch'; // Adjust the import path as necessary

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log(searchQuery, '검색중');
    // Add your search functionality here
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <main className="flex-grow p-4 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">검색 페이지</h1>
        <div className="flex items-center w-full mb-4">
          <Switch isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />
          <div className="relative flex-grow ml-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={isChecked ? "스타일의 태그를 입력하세요" : "사용자 닉네임을 입력하세요"}
              className="border p-2 rounded-full w-full pl-4"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
