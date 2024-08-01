// localUtils.js에서 setAccessToken와 setLocalRefreshToken 함수를 가져옵니다.
import { setAccessToken, setLocalRefreshToken } from '@/utils/localUtils';
// react-router-dom에서 useNavigate를 가져와 페이지 이동에 사용합니다.
import { useNavigate } from 'react-router-dom';
// 컴포넌트가 렌더링될 때 특정 작업을 수행하기 위해 react에서 useEffect를 가져옵니다.
import { useEffect } from 'react';

// URL에서 쿼리 파라미터를 추출하는 함수
const getQueryParams = (queryString) => {
  return queryString
    .slice(1) // 쿼리 문자열에서 '?'를 제거합니다.
    .split('&') // '&'를 기준으로 파라미터를 분리합니다.
    .reduce((params, param) => {
      const [key, value] = param.split('='); // 각 파라미터를 key와 value로 분리합니다.
      params[key] = decodeURIComponent(value); // 디코딩된 key-value 쌍을 params 객체에 추가합니다.
      return params;
    }, {});
};

// OAuthCallback 컴포넌트 정의
const OAuthCallback = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅을 사용합니다.

  useEffect(() => {
    // 현재 URL의 쿼리 파라미터를 추출합니다.
    const queryParams = getQueryParams(window.location.search);

    // 쿼리 파라미터에서 access_token과 refresh_token을 추출합니다.
    const accessToken = queryParams['access_token'];
    const refreshToken = queryParams['refresh_token'];

    // access_token과 refresh_token이 존재하는지 확인합니다.
    if (accessToken && refreshToken) {
      // 각 토큰을 local storage에 저장합니다.
      setAccessToken(accessToken);
      setLocalRefreshToken(refreshToken);

      // 토큰을 성공적으로 저장한 후, 설문 시작 페이지로 리디렉션합니다.
      navigate('/survey_start');
    } else {
      // 토큰이 없으면 경고를 표시하고 로그인 페이지로 리디렉션합니다.
      alert('토큰을 찾을 수 없습니다. 다시 로그인해 주세요.');
      navigate('/');
    }
  }, [navigate]); // navigate가 변경될 때마다 useEffect를 실행합니다.

  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않습니다.
  return null;
};

export default OAuthCallback;
