import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PersonSearchResult = ({ results, searchQuery }) => {
  const [visibleResults, setVisibleResults] = useState(4);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredResults([]);
      return;
    }

    // 검색 쿼리에 따른 검색 결과 나열
    //FIXME - 필터링 로직 우선 주석처리
    // const filtered = results
    //   .filter(
    //     (result) =>
    //       result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       result.description.toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    //   .sort((a, b) => {
    //     const aTitleIndex = a.title
    //       .toLowerCase()
    //       .indexOf(searchQuery.toLowerCase());
    //     const aDescIndex = a.description
    //       .toLowerCase()
    //       .indexOf(searchQuery.toLowerCase());
    //     const bTitleIndex = b.title
    //       .toLowerCase()
    //       .indexOf(searchQuery.toLowerCase());
    //     const bDescIndex = b.description
    //       .toLowerCase()
    //       .indexOf(searchQuery.toLowerCase());

    //     const aIndex = aTitleIndex >= 0 ? aTitleIndex : aDescIndex;
    //     const bIndex = bTitleIndex >= 0 ? bTitleIndex : bDescIndex;

    //     return aIndex - bIndex;
    //   });

    setFilteredResults(results);
  }, [results, searchQuery]);

  const handleShowMore = () => {
    setVisibleResults((prev) => prev + 4); // 검색결과 4개 더 표시
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
      style={{ width: '80%', maxWidth: '400px' }}
    >
      <h2 className="font-bold mb-4 text-center" style={{ fontSize: '16px' }}>
        검색결과
      </h2>
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {filteredResults.slice(0, visibleResults).map((result, index) => (
          <div
            key={index}
            className="p-2 rounded-lg relative flex items-center"
          >
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
                {result.nickname}
              </h3>
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

export default PersonSearchResult;
