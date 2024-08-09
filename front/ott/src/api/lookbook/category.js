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

export const getClothes = async (userId, categoryId, closetId) => {
  try {
    const response = await axiosInstance.get(
      `api/clothes/${userId}/${categoryId}`,
      { params: { closet_id: closetId } }
    );
    console.log('카테고리 옷', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllClothes = async (userId) => {
  try {
    const response = await axiosInstance.get(`api/clothes/${userId}/list`);
    console.log('전체 옷', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
