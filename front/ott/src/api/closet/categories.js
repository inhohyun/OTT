import axiosInstance from '../axiosInstance';

// 카테고리 조회
export const getCategoryList = async (closetId) => {
  try {
    const response = await axiosInstance.get(`/api/category/${closetId}`);
    console.log('카테고리 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};

// 카테고리 수정
export const fixCategory = async (closetId) => {
  try {
    const response = await axiosInstance.put(`/api/category/${closetId}`);
    console.log('카테고리 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};

// 카테고리 등록
export const addCategory = async (closetId) => {
  try {
    const response = await axiosInstance.post(`/api/category/${closetId}`);
    console.log('카테고리 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};

// 카테고리 삭제
export const deleteCategory = async (closetId) => {
  try {
    const response = await axiosInstance.delete(`/api/category/${closetId}`);
    console.log('카테고리 목록 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};
