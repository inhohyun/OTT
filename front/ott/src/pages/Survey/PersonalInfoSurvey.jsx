export default function PersonalInfoSurvey({
  formData,
  setFormData,
  handleNext,
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleBlur = (e) => {
    e.target.blur();
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">
        개인 정보
      </h2>
      <form onSubmit={handleNext} className="space-y-6">
        <div className="relative mb-5">
          <label htmlFor="name" className="block ml-1 mb-1 font-thin text-lg">
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이쟈니"
            value={formData.name || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <div className="relative mb-5">
          <label htmlFor="phone" className="block ml-1 mb-1 font-thin text-lg">
            전화번호
          </label>
          <input
            type="text"
            id="phone"
            placeholder="-을 뺀 숫자만 입력하세요"
            value={formData.phone || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-4/5 max-w-md p-3 rounded-full border border-violet-300 mx-auto block box-border focus:border-violet-400"
          />
        </div>
        <div className="relative mb-5">
          <label
            htmlFor="nickname"
            className="block ml-1 mb-1 font-thin text-lg"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하세요"
            value={formData.nickname || ''}
            onChange={handleChange}
            onBlur={handleBlur}
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
