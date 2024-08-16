import axiosInstance from '../axiosInstance';

export const searchStyle = async (tags, memberId) => {
  try {
    const response = await axiosInstance.get('api/lookbook/search', {
      params: { tags, memberId },
    });
    return response;
  } catch (error) {
    // console.error('Error fetching user info:', error);
  }
};
