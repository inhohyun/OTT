import { useState } from 'react';
import SurveyFormModal from '../../components/modals/SurveyFormModal';
import backgroundImage from '../../assets/images/background_image_survey.png';
import PersonalInfoSurvey from './PersonalInfoSurvey';
import PhysicalInfoSurvey from './PhysicalInfoSurvey';
import StyleInfoSurvey from './StyleInfoSurvey';
import SurveyFinish from './SurveyFinish';

export default function SurveyIng() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({});

  const handleNext = function(e) {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
      console.log(formData)
    } else {
      console.log('설문 제출 완료', formData);
      setModalOpen(false);
    }
  };

  const handlePrev = function() {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return <PersonalInfoSurvey formData={formData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <PhysicalInfoSurvey formData={formData} setFormData={setFormData} handleNext={handleNext} handlePrev={handlePrev} />;
      case 3:
        return <StyleInfoSurvey formData={formData} setFormData={setFormData} handleNext={handleNext} handlePrev={handlePrev} />;
      case 4:
        return <SurveyFinish formData={formData} setFormData={setFormData} handleNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <SurveyFormModal show={isModalOpen} step={step} totalSteps={totalSteps}>
        {renderFormContent()}
      </SurveyFormModal>
    </div>
  );
}
