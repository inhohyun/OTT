import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import finishIcon from '../../assets/images/survey/survey_finish.png';

export default function SurveyFinish({ formData }) {
  const navigate = useNavigate();
  console.log(formData);

  const genderMap = {
    남성: 'M',
    여성: 'W',
  };

  const bodyTypeMap = {
    '슬림': 'SLIM',
    '슬림 탄탄': 'MUSCULAR',
    '보통': 'AVERAGE',
    '통통': 'CHUBBY',
  };

  const handleComplete = async () => {
    try {
      // 한글 데이터 영어 번역
      const translatedGender = genderMap[formData.gender];
      const translatedBodyType = bodyTypeMap[formData.bodyType];

      // api 명세서 데이터 구조에 맞게 변환
      const dataToSend = {
        nickname: formData.nickname,
        name: formData.name,
        phoneNumber: formData.phone,
        profileImageUrl: formData.profileImageUrl,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        gender: translatedGender,
        bodyType: translatedBodyType,
        memberTags: formData.tags.map((tag) => ({ name: tag })),
      };

      // axios put 요청
      // await axios.put('http://your-backend-endpoint/api/member', dataToSend);

      // 백엔드로 넘겨진 데이터 확인
      console.log('Data sent to backend:', dataToSend);

      navigate('/mainpage');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm mx-auto">
        <img src={finishIcon} alt="Survey Done" className="mb-5 mx-auto" />
        <h2 className="text-xl font-bold mb-2 text-gray-800">스타일 조사가</h2>
        <h2 className="text-xl font-bold mb-6 text-gray-800">완료되었습니다</h2>
        <p className="text-stone-400 mb-2">수집된 정보는 비슷한 스타일에</p>
        <p className="text-stone-400 mb-2">대한 추천의 용도 외에는</p>
        <p className="text-stone-400 mb-2">사용되지 않으며, 데이터가 충분히</p>
        <p className="text-stone-400 mb-2">수집된 이후에는 폐기 처리됨을</p>
        <p className="text-stone-400 mb-2">알려드립니다.</p>
        <button
          className="bg-violet-400 text-white py-2 px-5 rounded-full mt-5 cursor-pointer text-lg hover:bg-violet-300"
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
    </div>
  );
}
