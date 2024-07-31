// cookieUtils.js
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//options : 쿠키에 저장된 데이터에 대한 설정(유효기간 설정 등)
/**
maxAge: 쿠키의 유효 기간을 초 단위로 설정합니다.
expires: 쿠키의 만료 날짜를 설정합니다. Date 객체를 사용합니다.
path: 쿠키가 유효한 경로를 설정합니다. 기본값은 '/'입니다.
domain: 쿠키가 유효한 도메인을 설정합니다.
secure: true로 설정하면 HTTPS 연결에서만 쿠키가 전송됩니다.
httpOnly: true로 설정하면 클라이언트 측 자바스크립트에서 쿠키에 접근할 수 없습니다.
 */
export const setRefreshToken = (token, options = {}) => {
  cookies.set('refreshToken', token, { path: '/', ...options });
};

export const getRefreshToken = () => {
  return cookies.get('refreshToken');
};

export const removeRefreshToken = () => {
  cookies.remove('refreshToken', { path: '/' });
};
