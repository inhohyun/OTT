import axios from 'axios';
import axiosInstance from '../axiosInstance';

// closet id 가져오기
export const getClosetId = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/closet/${memberId}`);
    return response;
  } catch (error) {
    console.error('옷장 id 가져오기 실패:', error);
    throw error;
  }
};

// 옷 추가
export const addClothes = async (formData) => {
  try {
    const response = await axiosInstance.post('api/clothes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Successfully added clothes:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding clothes:', error);
    throw error;
  }
};

// 단일 옷 정보 조회
export const getClothesItemData = async (clothesId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${clothesId}`);
    return response.data;
  } catch (error) {
    console.error('옷 정보 가져오기 실패:', error);
    throw error;
  }
};

// 전체 옷 조회
export const getClothesList = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${memberId}/list`);
    return response.data.map((item, index) => ({
      ...item,
      key: item.id || index,
    }));
  } catch (error) {
    console.error('옷 목록 가져오기 실패:', error);
    throw error;
  }
};

// 옷 즐겨찾기 추가
export const bookmarkClothes = async (clothesId) => {
  try {
    await axiosInstance.post(`/api/clothes/bookmark/${clothesId}`);
    console.log(`${clothesId} 북마크 성공`);
  } catch (error) {
    console.error(`${clothesId} 북마크 실패:`, error);
    throw error;
  }
};

// 옷 즐겨찾기 제거
export const unbookmarkClothes = async (clothesId) => {
  try {
    await axiosInstance.post(`/api/clothes/unbookmark/${clothesId}`);
    console.log(`${clothesId} 언북마크 성공`);
  } catch (error) {
    console.error(`${clothesId} 언북마크 실패:`, error);
    throw error;
  }
};

// 옷 수정
export const updateClothes = async (clothesId, formData) => {
  try {
    const response = await axiosInstance.put(
      `/api/clothes/${clothesId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Successfully updated clothes:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating clothes:', error);
    throw error;
  }
};

// 옷 삭제
export const deleteClothes = async (clothesId) => {
  try {
    await axiosInstance.delete(`/api/clothes/${clothesId}`);
    console.log(`${clothesId} 삭제 성공`);
  } catch (error) {
    console.error(`${clothesId} 삭제 실패:`, error);
    throw error;
  }
};

// 카테고리별 옷 조회
export const getClothesByCategory = async (memberId, categoryId, closetId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${memberId}/${categoryId}`, {
      params: { closet_id: closetId },
    });
    console.log('카테고리별 조회 성공');
    return response.data;
  } catch (error) {
    console.error('카테고리별 조회 실패');
    throw error;
  }
};
