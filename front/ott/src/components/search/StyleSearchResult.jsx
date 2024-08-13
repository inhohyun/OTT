import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faImage } from '@fortawesome/free-solid-svg-icons';

const StyleSearchResult = ({ results, searchQuery }) => {
  const [visibleResults, setVisibleResults] = useState(6);
  const [filteredResults, setFilteredResults] = useState([]);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // 스크롤이 끝에 도달하면 visibleResults 증가
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setVisibleResults((prev) => prev + 6);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
    console.log('results:', results);
    setFilteredResults(results);
  }, [results, searchQuery]);

  // 숫자 포맷하는 함수 정의
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  if (!filteredResults.length) {
    return <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>;
  }

  return (
    <div
      className="mx-auto text-stone-600 p-4 rounded-3xl"
      style={{ width: '80%', maxWidth: '1000px' }}
    >
      <h2 className="font-bold mb-4 text-center" style={{ fontSize: '16px' }}>
        "#{searchQuery}"에 대한 검색결과
      </h2>
      <div
        className="overflow-x-auto"
        ref={containerRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          className="grid grid-flow-col auto-cols-max grid-rows-2 gap-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {filteredResults.slice(0, visibleResults).map((result, index) => (
            <div
              key={index}
              className="flex-none w-56 p-2 rounded-lg relative flex flex-col items-center"
              style={{ minWidth: '180px', height: '250px' }}
            >
              <div className="bg-stone-200 p-4 rounded-lg shadow-md w-full h-full relative">
                <div className="absolute top-2 left-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-gray-400 mr-2"
                    style={{ fontSize: '24px' }}
                  />
                  <p className="text-xs text-gray-500">{result.username}</p>
                </div>
                <div className="flex flex-col items-center mt-4 mb-4">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-gray-400 mb-2"
                    style={{ fontSize: '135px' }}
                  />
                  <h3
                    className="text-base font-semibold"
                    style={{ fontSize: '14px' }}
                  >
                    {result.tags.map((tag) => `#${tag}`).join(' ')}
                  </h3>
                </div>
                <div className="absolute bottom-2 right-2 flex w-full justify-end">
                  <span className="text-xs text-gray-500 ml-2">
                    ❤️ {formatNumber(result.likes)}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    💬 {formatNumber(result.comments)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          .overflow-x-auto {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default StyleSearchResult;
