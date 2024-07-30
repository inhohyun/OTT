import { useState } from 'react';
import SearchInput from '../../components/search/SearchInput';
import CustomPersonSearchResult from '../../components/webRTC/CustomPersonSearchResult';
import VideoChat from './VideoChatPage';
import backgroundImage from '../../assets/images/background_image_main.png';
import PersonData from './PersonData'; // Import the mock data

const WebRTCPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for video chat

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLastSearchQuery(searchQuery); // Update the last search query

    // Filter the mockPeopleResults based on the search query
    const filteredResults = PersonData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
  };

  const handleStartVideoChat = (userName) => {
    setSelectedUser(userName); // Set the selected user for video chat
  };

  const handleEndVideoChat = () => {
    setSelectedUser(null); // Reset selected user to exit video chat
  };

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {selectedUser ? (
        <VideoChat userName={selectedUser} onEndChat={handleEndVideoChat} />
      ) : (
        <main className="flex-grow p-4 w-full max-w-md mx-auto mt-5">
          <h1 className="text-2xl font-bold mb-4">화상 중고거래중</h1>
          <SearchInput
            searchQuery={searchQuery}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
            isChecked={false}
            handleCheckboxChange={() => {}}
          />
          <CustomPersonSearchResult
            results={results}
            searchQuery={lastSearchQuery}
            onStartVideoChat={handleStartVideoChat}
          />
        </main>
      )}
    </div>
  );
};

export default WebRTCPage;
