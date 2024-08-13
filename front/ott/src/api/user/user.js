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
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserListNickname = async (nickname) => {
  try {
    console.log(nickname);
    const endpoint = `api/members/more?nickname=${nickname}`;
    
    const response = await axiosInstance.get(endpoint);
    
    if (response && response.status === 200 && response.data) {
      const data = response.data.data;

      if (data) {
        const processedData = data.map(user => ({
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl,
        }));
        console.log(processedData);
        
        return processedData;
      } else {
        throw new Error('Response data is empty');
      }
    } else {
      throw new Error(`Unexpected response structure or status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error search user:', error);
    throw error;
  }
}
