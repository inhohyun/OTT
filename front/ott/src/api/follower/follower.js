import { get, post, put, del } from '../axiosInstance';

// TODO : 팔로워 수를 받아올지 팔로우 목록을 통해 수를 추출할지 결정

//팔로워 목록을 조회하는 API
export const getFollowerList = async ({ userId }) => {
  try {
    const response = await get({ endPoint: `/users/${userId}/followers` });
    return response;
  } catch (error) {
    console.error('팔로워 목록 조회중 에러 :', error);
    throw error;
  }
};
