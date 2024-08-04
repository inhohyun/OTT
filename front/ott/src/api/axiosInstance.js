import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getLocalRefreshToken,
  removeLocalRefreshToken,
} from '@/utils/localUtils';
import {
  setCookie,
  removeCookie as removeRefreshToken,
} from '@/utils/cookieUtils';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // TODO : 서버의 URL로 변경
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: `localhost:3000`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.access = `${token}`;
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
      return Promise.reject(new Error('No access token found'));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//TODO : 에러 핸들링 추가 예정
// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response.data, // 정상 응답 중 data만 꺼내주기
  async (error) => {
    const originalRequest = error.config; // 실패한 요청의 설정을 가져옴
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getLocalRefreshToken();
        setCookie('refreshToken', refreshToken); // 쿠키에 Refresh Token 설정
        const response = await axiosInstance.get('/refresh-token'); // Refresh Token 요청
        setAccessToken(response.data.accessToken); // 새로운 Access Token 저장
        originalRequest.headers.access = `${response.data.accessToken}`; // 요청에 새로운 Access Token 포함
        removeRefreshToken('refreshToken'); // 응답 후 쿠키에서 Refresh Token 제거
        return axiosInstance(originalRequest); // 원래 요청 재시도
      } catch (err) {
        console.error('토큰 갱신 실패:', err);
        removeAccessToken(); // 실패 시 토큰 제거
        removeLocalRefreshToken();
        window.location.href = '/'; // 로그인 페이지로 리디렉션
      }
    }
    console.error('인스턴스에서 API 호출 실패:', error);
    return Promise.reject(error); // 그 외의 오류는 그대로 반환
  }
);

  //TODO : 변수명 문제 발생관련 문제시 config.js에 매핑 함수를 만들든지, 아니면 아래 메서드들을 삭제
export const get = ({ endPoint, id }) => {
  if (id) {
    return axiosInstance.get(endPoint, { params: { id } });
  }
  return axiosInstance.get(endPoint);
};

export const post = ({ endPoint, data }) => {
  return axiosInstance.post(endPoint, data);
};

export const put = ({ endPoint, data }) => {
  return axiosInstance.put(endPoint, data);
};

export const del = ({ endPoint, id }) => {
  if (id) {
    return axiosInstance.delete(endPoint, { data: { id } });
  }
  return axiosInstance.delete(endPoint);
};

export default axiosInstance;
