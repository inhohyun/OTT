export default function StyleInfoSurvey({ formData, setFormData, handleNext }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <h2 className="text-4xl mb-5 text-center text-gray-800 font-thin">설문 3</h2>
      <form onSubmit={handleNext} className="space-y-6">
        {/* Add your form elements for Step 3 */}
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
