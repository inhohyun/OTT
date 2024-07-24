const ProgressBar = ({ step, totalSteps }) => {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-purple-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;