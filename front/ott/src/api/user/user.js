import { get, put } from '../axiosInstance';

// 유저 페이지에서 사용자 정보를 불러옴
export const getUserInfo = async (userId) => {
  try {
    const response = await get({ endPoint: `/user/${userId}` });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 사용자 정보를 업데이트함
export const updateUserInfo = async (userId, updateData) => {
  try {
    const response = await put({
      endPoint: `/user/${userId}`,
      data: updateData,
    });
    return response;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};
