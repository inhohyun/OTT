import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import LookbookList from '../lookbook/LookbookList';

const SearchResult = ({ results, searchQuery, isChecked }) => {
  const [visibleResults, setVisibleResults] = useState(4);

  const handleShowMore = () => {
    setVisibleResults(prev => prev + 4); // Show 4 more results
  };

  if (!results.length) {
    return <p className="text-gray-500 text-center">검색어를 입력하세요</p>;
  }

  return (
    <div 
      className="mt-10 mx-auto backdrop-blur-md bg-violet-200 bg-opacity-40 text-stone-600 p-4 rounded-3xl shadow-md"
      style={{ width: '80%', maxWidth: '400px' }}
    >
      <h2 
        className="font-bold mb-4 text-center"
        style={{ fontSize: '16px' }}
      >
        "{searchQuery}"에 대한 검색결과
      </h2>
      <div className="space-y-4">
        {results.slice(0, visibleResults).map((result, index) => (
          <div key={index} className="p-2 rounded-lg relative flex items-center">
            {!isChecked && (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-gray-400 mr-4"
                style={{ fontSize: '36px' }}
              />
            )}
            <div>
              <h3 className="text-base font-semibold mb-2" style={{ fontSize: '14px' }}>{result.title}</h3>
              <p className="text-xs text-stone-500" style={{ fontSize: '12px' }}>{result.description}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleResults < results.length && (
        <p
          onClick={handleShowMore}
          className="mt-2 text-stone-500 py-1 px-3 rounded-full cursor-pointer text-center"
        >
          더보기
        </p>
      )}
      {isChecked && (
        <LookbookList
          tag={searchQuery}
          lookbooks={results}
        />
      )}
    </div>
  );
};

export default SearchResult;
