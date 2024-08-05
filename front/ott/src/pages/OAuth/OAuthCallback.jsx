// localUtils.js에서 setAccessToken과 setLocalRefreshToken 함수를 가져옵니다.
import { setAccessToken, setLocalRefreshToken } from '@/utils/localUtils';
// react-router-dom에서 useNavigate를 가져와 페이지 이동에 사용합니다.
import { useNavigate } from 'react-router-dom';
// 컴포넌트가 렌더링될 때 특정 작업을 수행하기 위해 react에서 useEffect를 가져옵니다.
import { useEffect } from 'react';
// 쿠키 처리를 위해 react-cookie를 가져옵니다.
import { useCookies } from 'react-cookie';

// OAuthCallback 컴포넌트 정의
const OAuthCallback = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지를 이동합니다.
  const [cookies, setCookie, removeCookie] = useCookies(['refresh']);

  useEffect(() => {
    // 쿠키가 로드될 때까지 기다립니다.
    const checkCookies = () => {
      const refreshToken = cookies['refresh'];
      // 헤더에서 액세스 토큰 추출
      console.log('쿠키에 들어있는 값 출력:', refreshToken);

      if (refreshToken) {
        // 각각의 토큰을 로컬 스토리지에 저장합니다.
        setLocalRefreshToken(refreshToken);

        // 토큰을 성공적으로 저장한 후, 설문 시작 페이지로 리디렉션합니다.
        navigate('/survey_start');
      } else {
        // 토큰이 없으면 경고 메시지를 표시하고 로그인 페이지로 리디렉션합니다.
        alert('토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
        navigate('/');
      }
    };

    // 쿠키가 로드되었는지 확인
    if (cookies['refresh']) {
      checkCookies();
    } else {
      // 쿠키가 아직 로드되지 않은 경우 일정 시간 후 다시 시도
      const interval = setInterval(() => {
        if (cookies['refresh']) {
          checkCookies();
          clearInterval(interval);
        }
      }, 100);
    }
  }, [cookies, navigate]);

  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않습니다.
  return null;
};

export default OAuthCallback;
