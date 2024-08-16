import iconImage from '/icon-512x512.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import backgroundImage from '../../assets/images/background_image_survey.png';
import { getSurveyCompleteStatus } from '../../api/user/user';

export default function SurveyStart() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSurveyStatus = async () => {
      try {
        const response = await getSurveyCompleteStatus();
        // console.log(response);

        const { surveyCompleted } = response;
        if (surveyCompleted) {
          navigate('/mainpage');
        }
      } catch (error) {
        // console.error('설문조사 상태 확인 중 에러 발생:', error);
      }
    };

    checkSurveyStatus();
  }, [navigate]);

  const handleSurveyIng = () => {
    navigate('/survey_ing');
  };

  return (
    <div
      className="flex justify-center items-center w-full bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="rounded-lg p-8 max-w-md text-center">
        <img
          src={iconImage}
          alt="main icon"
          className="w-24 h-24 mb-16 rounded-full mx-auto"
        />
        <h2 className="text-3xl mb-8">설문조사 실시 안내</h2>
        <p className="text-sm mb-12 max-w-xs mx-auto">
          스타일 추천에 필요한 최소한의 신체 정보 및 개인정보, 성향 파악을 위한
          설문입니다
        </p>
        <button
          className="bg-violet-400 text-white border-none py-2 px-5 rounded mt-5 cursor-pointer text-lg w-full max-w-md hover:bg-violet-300"
          onClick={handleSurveyIng}
        >
          설문 시작하기
        </button>
      </div>
    </div>
  );
}
