import axiosInstance from '../axiosInstance';

export const searchStyle = async (style, offset, limit) => {
  try {
    const response = await axiosInstance.get('api/lookbook/search', {
      params: {
        style,
        offset,
        limit,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
