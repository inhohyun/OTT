import axiosInstance from '../axiosInstance';

export const getClosetId = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/closet/${memberId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (closetId) => {
  try {
    const response = await axiosInstance.get(`api/category/${closetId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
