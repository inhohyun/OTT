export default function PhysicalInfoSurvey({ formData, setFormData, handleNext, handlePrev }) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'height' || id === 'weight') {
      // Only allow numbers and restrict length to 3 digits
      const regex = /^\d{0,3}$/;
      if (!regex.test(value)) {
        return; // Do not update the state if the value is invalid
      }
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleCardClick = (bodyType) => {
    setFormData({ ...formData, bodyType });
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">신체 정보</h2>
      <form onSubmit={handleNext} className="space-y-6">
        <div className="relative mb-5 flex justify-between items-center">
          <label htmlFor="height" className="block ml-1 mb-1 font-thin text-lg">당신의 키는?</label>
          <div className="relative flex items-center">
            <input
              type="number"
              id="height"
              value={formData.height || ''}
              onChange={handleChange}
              required
              max="999"
              className="w-20 p-2 rounded-full border border-stone-300 box-border"
            />
            <span className="absolute right-3 text-stone-400">cm</span>
          </div>
        </div>
        <div className="relative mb-10 flex justify-between items-center">
          <label htmlFor="weight" className="block ml-1 mb-1 font-thin text-lg">당신의 몸무게는?</label>
          <div className="relative flex items-center">
            <input
              type="number"
              id="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              required
              max="999"
              className="w-20 p-2 rounded-full border border-stone-300 box-border"
            />
            <span className="absolute right-3 text-stone-400">kg</span>
          </div>
        </div>
        <div className="relative mb-10">
          <label className="block ml-1 mb-5 font-thin text-lg">당신의 체형은?</label>
          <div className="grid grid-cols-2 gap-4">
            {['슬림', '슬림 탄탄', '보통', '통통'].map((type) => (
              <div
                key={type}
                onClick={() => handleCardClick(type)}
                className={`cursor-pointer p-4 rounded-lg border text-center text-stone-400 ${
                  formData.bodyType === type ? 'bg-violet-200' : ''
                }`}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-4/5 max-w-md mx-auto">
          <button
            type="button"
            className="border border-violet-500 bg-white text-violet-500 py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-violet-50"
            onClick={handlePrev}
          >
            이전
          </button>
          <button
            type="submit"
            className="bg-violet-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-violet-300"
          >
            다음
          </button>
        </div>
      </form>
    </>
  );
}
