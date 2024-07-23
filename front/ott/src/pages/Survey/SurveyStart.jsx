import './SurveyStart.css';
import iconImage from '/icon-512x512.png';
import { useNavigate } from 'react-router-dom';

export default function SurveyStart() {
  const navigate = useNavigate();

  const handleSurveyIng = () => {
    navigate('/survey_ing');
  };


  return (
    <div className="survey-container">
      <div className="survey-card">
        <img src={iconImage} alt="main icon" className='survey-icon' />
        <h2>설문조사 실시 안내</h2>
        <p>
          스타일 추천에 필요한 최소한의 신체 정보 및 개인정보, 성향 파악을 위한 설문입니다
        </p>
        <button className="survey-button" onClick={handleSurveyIng}>설문 시작하기</button>
      </div>
    </div>
  );
}