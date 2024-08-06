import axios from 'axios';
import axiosInstance from '../axiosInstance';

// 유저 페이지에서 사용자 정보를 불러옴
export const getUserInfo = async (uid) => {
  try {
    //TODO : 엔드포인트 맞추기
    const response = await axiosInstance.get(`/${uid}`);
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 사용자 정보를 업데이트함
export const updateUserInfo = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}`, updateData);
    return response;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// uid를 가져오는 api
export const getUid = async () => {
  try {
    const response = await axiosInstance.get('/api/members/my');
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
