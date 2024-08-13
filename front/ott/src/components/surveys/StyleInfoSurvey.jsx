import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getUid, addMemberTags } from '../../api/user/user';

export default function StyleInfoSurvey({
  formData,
  setFormData,
  handleNext,
  handlePrev,
}) {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState(formData.tags || []);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setErrorMessage('');
  };

  const handleSearchSubmit = (e) => {
    if (searchText.trim() === '') {
      return;
    }
    if (tags.includes(searchText.trim())) {
      setErrorMessage('이미 존재하는 태그입니다.');
      return;
    }
    if (tags.length >= 5) {
      return;
    }
    const newTags = [...tags, searchText.trim()];
    setTags(newTags);
    setFormData({ ...formData, tags: newTags });
    setSearchText('');
  };

  const handleTagRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setFormData({ ...formData, tags: newTags });
  };

  const handleNextClick = async () => {
    try {
      const response = await getUid();
      const memberId = response.data.id;

      await addMemberTags(memberId, tags);
      console.log('태그 추가 성공', tags);
      handleNext();
    } catch (error) {
      console.error('태그 추가 중 오류 발생:', error);
    }
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">
        선호하는 스타일
      </h2>
      <p className="text-center text-gray-600 mb-5">(최소 2개, 최대 5개)</p>
      <form onSubmit={handleSearchSubmit} className="space-y-6">
        <div className="relative mb-2 flex justify-between items-center">
          <input
            type="text"
            id="style"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="검색할 스타일을 입력하세요"
            className="w-full p-2 rounded-full border border-violet-300 box-border focus:border-violet-400"
          />
          <span
            onClick={handleSearchSubmit}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-violet-400 text-white px-3 py-1 rounded-full"
            >
              <span>{tag}</span>
              <button
                type="button"
                className="ml-2 bg-violet-400 text-white"
                onClick={() => handleTagRemove(tag)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="flex justify-between w-4/5 max-w-md mx-auto">
        <button
          type="button"
          className="border border-violet-500 bg-white text-violet-500 py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-violet-50"
          onClick={handlePrev}
        >
          이전
        </button>
        <button
          type="button"
          disabled={tags.length < 2}
          className={`py-2 px-5 rounded-full mt-5 cursor-pointer text-lg ${
            tags.length >= 2
              ? 'bg-violet-400 text-white hover:bg-violet-300'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleNextClick}
        >
          다음
        </button>
      </div>
    </>
  );
}
