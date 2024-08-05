import { get } from '../axiosInstance';

//팔로잉 목록을 조회하는 API
export const getFollowingList = async ({ userId }) => {
  try {
    const response = await get({ endPoint: `/users/${userId}/followings` });
    return response;
  } catch (error) {
    console.error('팔로워 목록 조회중 에러 :', error);
    throw error;
  }
};
