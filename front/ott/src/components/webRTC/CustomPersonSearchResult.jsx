import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CustomPersonSearchResult = ({
  // 검색 결과 데이터 배열
  results,        
  // 사용자가 입력한 검색어 
  searchQuery,     
}) => {
  const [visibleResults, setVisibleResults] = useState(4); // 한 번에 결과 4개 표시
  const [filteredResults, setFilteredResults] = useState([]); // 필터링된 결과 저장
  const navigate = useNavigate(); // 페이지 이동

  useEffect(() => {
    if (!searchQuery) {
      setFilteredResults([]);
      return;
    }

    // 검색어와 일치하는 결과 필터링 및 정렬
    const filtered = results
      .filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const aTitleIndex = a.title
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase());
        const aDescIndex = a.description
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase());
        const bTitleIndex = b.title
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase());
        const bDescIndex = b.description
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase());

        const aIndex = aTitleIndex >= 0 ? aTitleIndex : aDescIndex;
        const bIndex = bTitleIndex >= 0 ? bTitleIndex : bDescIndex;

        return aIndex - bIndex;
      });

    setFilteredResults(filtered);
  }, [results, searchQuery]);

  // "더보기" 버튼 클릭 시 추가 결과 표시
  const handleShowMore = () => {
    setVisibleResults((prev) => prev + 4);
  };

  // 비디오 채팅 시작
  const startVideoChat = (username) => {
    navigate(`/video-chat/${username}`);
  };

  if (!searchQuery) {
    return null;
  }

  if (!filteredResults.length) {
    return <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>;
  }

  return (
    <div
      className="mt-10 mx-auto backdrop-blur-md bg-violet-200 bg-opacity-40 text-stone-600 p-4 rounded-3xl shadow-md"
      style={{
        width: '80%',
        maxWidth: '400px',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      <h2 className="font-bold mb-4 text-center" style={{ fontSize: '16px' }}>
        검색결과
      </h2>
      <div className="space-y-4">
        {filteredResults.slice(0, visibleResults).map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 rounded-lg relative"
          >
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-gray-400 mr-4"
                style={{ fontSize: '36px' }}
              />
              <div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontSize: '14px' }}
                >
                  {result.title}
                </h3>
                <p
                  className="text-xs text-stone-500"
                  style={{ fontSize: '12px' }}
                >
                  {result.description}
                </p>
              </div>
            </div>
            <div
              onClick={() => startVideoChat(result.title)}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <FontAwesomeIcon icon={faVideo} className="text-xl" />
            </div>
          </div>
        ))}
      </div>
      {visibleResults < filteredResults.length && (
        <p
          onClick={handleShowMore}
          className="mt-2 text-stone-500 py-1 px-3 rounded-full cursor-pointer text-center"
        >
          더보기
        </p>
      )}
    </div>
  );
};

export default CustomPersonSearchResult;
