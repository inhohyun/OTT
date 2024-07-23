export default function PhysicalInfoSurvey({ formData, setFormData, handleNext }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">설문 2</h2>
      <form onSubmit={handleNext} className="space-y-6">
        <div className="relative mb-5">
          <label htmlFor="bodyType" className="block ml-1 mb-1 font-thin text-lg">체형</label>
          <input
            type="text"
            id="bodyType"
            placeholder="체형을 입력하세요"
            value={formData.bodyType || ''}
            onChange={handleChange}
            required
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <button
          type="submit"
          className="bg-violet-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg w-4/5 max-w-md mx-auto block text-center hover:bg-violet-300"
        >
          다음
        </button>
      </form>
    </>
  );
}
