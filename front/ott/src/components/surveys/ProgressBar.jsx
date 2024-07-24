import iconImage from '/icon-192x192.png';

const ProgressBar = ({ step, totalSteps }) => {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="w-full h-4 mb-4 relative">
      <div className="absolute w-full bg-stone-200 rounded-full h-4"></div>
      <div
        className="absolute bg-purple-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
      <img
        src={iconImage}
        alt="Progress Icon"
        className="absolute top-1/2 transform -translate-y-1/2 rounded-full"
        style={{ width: '20px', height: '20px', right: `${100 - percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
