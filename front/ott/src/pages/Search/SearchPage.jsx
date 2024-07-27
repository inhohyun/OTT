import { useState } from 'react';
import backgroundImage from '../../assets/images/background_image_main.png';
import SearchInput from '../../components/search/SearchInput';
import SearchResult from '../../components/search/SearchResult';


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (isChecked) {
      // Mock search function for tags
      const mockTagResults = [
        { title: 'Tag 1', description: 'Description for tag 1' },
        { title: 'Tag 2', description: 'Description for tag 2' },
      ];
      setResults(mockTagResults);
    } else {
      // Mock search function for people
      const mockPeopleResults = [
        { title: '이정준', description: 'Description for person 1' },
        { title: '차은우', description: 'Description for person 2' },
        { title: '송강', description: 'Description for person 3' },
        { title: '변우석', description: 'Description for person 4' },
        { title: '원빈', description: 'Description for person 5' },
        { title: '차정준', description: 'Description for person 6' },
      ];
      setResults(mockPeopleResults);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setSearchQuery(''); // Clear the search input
    setResults([]); // Clear the search results
  };

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <main className="flex-grow p-4 w-full max-w-md mx-auto mt-5">
        <SearchInput
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          handleSearch={handleSearch}
        />
<SearchResult results={results} searchQuery={searchQuery} isChecked={isChecked} />      </main>
    </div>
  );
};

export default SearchPage;
