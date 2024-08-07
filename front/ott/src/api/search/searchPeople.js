import axiosInstance from '../axiosInstance';

export const searchPeople = async (offset, limit, nickname) => {
  try {
    const response = await axiosInstance.get('/more', {
      params: {
        offset,
        limit,
        nickname,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
