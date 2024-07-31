// localUtils에서 setAccessToken과 setRefreshToken 함수를 가져옵니다.
import { setAccessToken, setRefreshToken } from '../utils/localUtils';
// useNavigate를 react-router-dom에서 가져와 페이지 이동에 사용합니다.
import { useNavigate } from 'react-router-dom';
// useEffect를 react에서 가져와 컴포넌트가 렌더링될 때 특정 작업을 수행합니다.
import { useEffect } from 'react';

// URL에서 쿼리 파라미터를 추출하는 함수
const getQueryParams = (queryString) => {
  return queryString
    .slice(1) // 쿼리 문자열의 '?'를 제거
    .split('&') // '&'를 기준으로 파라미터 분리
    .reduce((params, param) => {
      const [key, value] = param.split('='); // 각 파라미터를 key와 value로 분리
      params[key] = decodeURIComponent(value); // key-value 쌍으로 params 객체에 추가
      return params;
    }, {});
};

// OAuthCallback 컴포넌트 정의
const OAuthCallback = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  useEffect(() => {
    // 현재 URL의 쿼리 파라미터를 추출
    const queryParams = getQueryParams(window.location.search);

    // 쿼리 파라미터에서 access_token과 refresh_token 추출
    const accessToken = queryParams['access_token'];
    const refreshToken = queryParams['refresh_token'];

    // access_token과 refresh_token이 존재하는지 확인
    if (accessToken && refreshToken) {
      // 각각의 토큰을 로컬 스토리지에 저장
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 성공적으로 토큰을 저장한 후 설문 시작 페이지로 리디렉트
      navigate('/survey_start');
    } else {
      // 토큰이 없으면 경고를 표시하고 로그인 페이지로 리디렉트
      alert('토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
      navigate('/');
    }
  }, [navigate]); // navigate가 변경될 때마다 useEffect 실행

  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않음
  return null;
};

export default OAuthCallback;
