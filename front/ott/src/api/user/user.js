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

// 팔로잉 수 조회 api
export const getFollowingCount = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/members/${memberId}/`);
    console.log('팔로우수', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 다른 사용자를 팔로우
export const followUser = async (targetId) => {
  try {
    const response = await axiosInstance.post(
      `/api/members/follow/${targetId}`
    );
    return response;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

// 다른 사용자 언팔로우
export const unfollowUser = async (targetId) => {
  try {
    const response = await axiosInstance.post(
      `/api/members/unfollow/${targetId}`
    );
    return response;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};
