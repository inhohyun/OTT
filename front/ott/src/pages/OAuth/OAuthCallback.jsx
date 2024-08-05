// localUtils.js에서 setAccessToken과 setLocalRefreshToken 함수를 가져옵니다.
import { setAccessToken, setLocalRefreshToken } from '@/utils/localUtils';
// react-router-dom에서 useNavigate를 가져와 페이지 이동에 사용합니다.
import { useNavigate } from 'react-router-dom';
// 컴포넌트가 렌더링될 때 특정 작업을 수행하기 위해 react에서 useEffect를 가져옵니다.
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
// 헤더에서 액세스 토큰을 추출하는 함수
// const getAccessTokenFromHeaders = () => {
//   // 액세스 토큰이 URL의 쿼리 매개변수로 전달된다고 가정합니다.
//   const accessToken = new URLSearchParams(window.location.search).get('Access');
//   return accessToken;
// };

// OAuthCallback 컴포넌트 정의
const OAuthCallback = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지를 이동합니다.
  const cookies = new Cookies(); // react-cookie의 Cookies 클래스를 사용하여 쿠키를 가져옵니다.
  useEffect(() => {
    axios
      .post(
        'https://i11c205.p.ssafy.io/api/reissue',
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log('response', response);
        console.log('response.headers', response.headers);
        const AccessToken = response.headers['Access'].split(' ')[1];
        const accessToken = response.headers['access'].split(' ')[1];
        console.log('accessToken', accessToken);
        console.log('AccessToken', AccessToken);

        localStorage.setItem('accessToken', accessToken);
        alert('Access token stored in local storage');
        navigate('/survey_start');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to refresh access token');
      });
  }, [navigate]);

  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않습니다.
  return null;
};

export default OAuthCallback;
