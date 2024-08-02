import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// options : 쿠키에 저장된 데이터에 대한 설정(유효기간 설정 등)
/**
 * maxAge: 쿠키의 유효 기간을 초 단위로 설정합니다.
 * expires: 쿠키의 만료 날짜를 설정합니다. Date 객체를 사용합니다.
 * path: 쿠키가 유효한 경로를 설정합니다. 기본값은 '/'입니다.
 * domain: 쿠키가 유효한 도메인을 설정합니다.
 * secure: true로 설정하면 HTTPS 연결에서만 쿠키가 전송됩니다.
 * httpOnly: true로 설정하면 클라이언트 측 자바스크립트에서 쿠키에 접근할 수 없습니다.
 */

// Cookie 설정
export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, { path: '/', ...options });
};

// Refresh Token 설정
export const setCookieRefreshToken = (token, options = {}) => {
  setCookie('refreshToken', token, options);
};

// Refresh Token 가져오기
export const getCookieRefreshToken = () => {
  return cookies.get('refreshToken');
};

// Refresh Token 삭제
export const removeCookie = (name) => {
  cookies.remove(name, { path: '/' });
};
