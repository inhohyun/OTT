import axios from 'axios';
import axiosInstance from '../axiosInstance';

// 유저 페이지에서 사용자 정보를 불러옴
export const getUserInfo = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/members/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 사용자 정보를 업데이트함
export const updateUserInfo = async (memberId, MemberUpdateRequestDto) => {
  try {
    const response = await axiosInstance.put(
      `/api/members/${memberId}`,
      MemberUpdateRequestDto
    );
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

// closet id 가져오는 api
export const getClosetId = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/closet/${memberId}`);
    return response;
  } catch (error) {
    console.error('옷장 id 가져오기 실패:', error);
    throw error;
  }
};
