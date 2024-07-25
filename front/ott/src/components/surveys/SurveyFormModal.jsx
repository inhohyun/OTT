import ProgressBar from "./ProgressBar";

export default function SurveyFormModal({ show, children, step, totalSteps }) {
  if (!show) {
    return null;
  } 

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-11/12 shadow-lg">
        <ProgressBar step={step} totalSteps={totalSteps} />
        {children}
      </div>
    </div>
  );
}
