import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '@/utils/localUtils';
// 환경 변수에서 API 기본 URL을 가져옴
const baseURL = 'https://i11c205.p.ssafy.io';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000000, // FIXME : 타임아웃 시간 수정 필요
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
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.get('/api/reissue');
        const newAccessToken = response.headers['access']; // 새로운 Access Token 가져오기
        setAccessToken(newAccessToken); // 새로운 Access Token 저장

        // 수정된 부분: 요청에 새로운 Access Token 포함
        originalRequest.headers.access = `${newAccessToken}`;

        return axiosInstance(originalRequest); // 원래 요청 재시도
      } catch (err) {
        console.error('토큰 에러: ', err);
        alert('세션이 만료되었습니다. 다시 로그인해주세요:');
        removeAccessToken(); // 실패 시 토큰 제거
        window.location.href = '/'; // 로그인 페이지로 리디렉션
      }
    }
    console.error('인스턴스에서 API 호출 실패:', error);
    return Promise.reject(error); // 그 외의 오류는 그대로 반환
  }
);

export default axiosInstance;
