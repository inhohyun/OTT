import { get, post, put, del } from '../axiosInstance';

//유저 페이지에서 사용자 정보를 불러옴
export const getUserInfo = async (userId) => {
  // TODO : 닉네임으로 구분하는지 ID로 구분하는지 처리 필요
  try {
    const response = await get({ endPoint: `/user/${userId}` });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
