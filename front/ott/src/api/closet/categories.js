import axiosInstance from '../axiosInstance';

// 카테고리 목록
export const getCategoryList = async (closetId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${closetId}`);
    console.log('카테고리 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};

// 카테고리 조회
export const getCategory = async (userId, categoryId) => {
  try {
    const response = await axiosInstance.get(
      `/api/clothes/${userId}/${categoryId}`
    );
    console.log('카테고리 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 조회 실패:', error);
    throw error;
  }
};
