// localUtils.js

// Access Token 설정
export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Access Token 가져오기
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Access Token 삭제
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Refresh Token 설정
export const setLocalRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

// Refresh Token 가져오기
export const getLocalRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Refresh Token 삭제
export const removeLocalRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};
