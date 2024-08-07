import axiosInstance from '../axiosInstance';

export const searchPeople = async (nickname, offset, limit) => {
  try {
    const response = await axiosInstance.get('/api/members/more', {
      params: {
        nickname,
        offset,
        limit,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
