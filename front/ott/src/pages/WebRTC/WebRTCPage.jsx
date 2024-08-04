import { useState } from 'react';
import CustomSearchInput from '../../components/webRTC/CustomSearchInput';
import CustomPersonSearchResult from '../../components/webRTC/CustomPersonSearchResult';
import VideoChat from './VideoChatPage';
import backgroundImage from '../../assets/images/background_image_main.png';
import PersonData from './PersonData'; // 모의 데이터 가져오기

const WebRTCPage = () => {
  // 상태 선언
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [lastSearchQuery, setLastSearchQuery] = useState(''); // 마지막 검색어 상태
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [selectedUser, setSelectedUser] = useState(null); // 화상 채팅에 선택된 사용자

  // 검색 입력 변화 처리
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 버튼 클릭 시 호출
  const handleSearch = () => {
    if (!searchQuery) {
      // 검색어가 없으면 결과를 비움
      setResults([]); 
      return;
    }

    // 마지막 검색어 업데이트
    setLastSearchQuery(searchQuery); 

    // 모의 데이터에서 검색어를 포함하는 항목 필터링
    const filteredResults = PersonData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
  };

  // 화상 채팅 시작 버튼 클릭 시 호출
  const handleStartVideoChat = (userName) => {
    // 선택된 사용자 설정
    setSelectedUser(userName); 
  };

  // 화상 채팅 종료 버튼 클릭 시 호출
  const handleEndVideoChat = () => {
    // 선택된 사용자 초기화
    setSelectedUser(null); 
  };

  return (
    <div
      className="relative flex flex-col items-center w-full h-full min-h-screen bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {selectedUser ? (
        // 선택된 사용자가 있는 경우 화상 채팅 컴포넌트 표시
        <VideoChat userName={selectedUser} onEndChat={handleEndVideoChat} />
      ) : (
        // 선택된 사용자가 없는 경우 검색 입력 및 결과 표시
        <main className="flex-grow p-4 w-full max-w-md mx-auto mt-5">
          <h1 className="text-2xl font-bold mb-4">화상 중고거래중</h1>
          <CustomSearchInput
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
