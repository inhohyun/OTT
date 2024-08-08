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
export const fixCategory = async (closetId, categoryId, newName) => {
  try {
    const requestBody = {
      categoryId: categoryId,
      closetId: closetId,
      newName: newName
    };
    const response = await axiosInstance.put(`/api/category/${closetId}`, requestBody);
    console.log('카테고리 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    throw error;
  }
};

// 카테고리 등록
export const addCategory = async (closetId, name) => {
  try {
    const requestBody = {
      name: name
    }
    const response = await axiosInstance.post(`/api/category/${closetId}`, requestBody);
    console.log('카테고리 추가 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 추가 실패:', error);
    throw error;
  }
};

// 카테고리 삭제
export const deleteCategory = async (closetId) => {
  try {
    const response = await axiosInstance.delete(`/api/category/${closetId}`);
    console.log('카테고리 삭제 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('카테고리 삭제 실패:', error);
    throw error;
  }
};
