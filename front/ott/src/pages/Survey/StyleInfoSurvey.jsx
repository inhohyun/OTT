import { useState } from 'react';

export default function StyleInfoSurvey({
  formData,
  setFormData,
  handleNext,
  handlePrev,
}) {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (searchText.trim() !== '' && tags.length < 5) {
      const newTags = [...tags, searchText.trim()];
      setTags(newTags);
      setFormData({ ...formData, tags: newTags });
      setSearchText('');
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const handleBlur = (e) => {
    e.target.blur();
  };
  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">
        선호하는 스타일
      </h2>
      <p className="text-center text-gray-600 mb-5">(최대 5개)</p>
      <form onSubmit={handleSearchSubmit} className="space-y-6">
        <div className="relative mb-10 flex justify-between items-center">
          <input
            type="text"
            id="style"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="검색할 스타일을 입력하세요"
            onBlur={handleBlur}
            className="w-full p-2 rounded-full border border-violet-300 box-border focus:border-violet-400"
          />
        </div>
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
          className="bg-gray-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-gray-500"
          onClick={handlePrev}
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-violet-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-violet-300"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </>
  );
}
