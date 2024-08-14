import axiosInstance from '../axiosInstance';
import { getCategoryList } from './categories';

// closet id 가져오기
export const getClosetId = async (memberId) => {
  try {
    console.log('closetId memberId:', memberId);
    const response = await axiosInstance.get(`api/closet/${memberId}`);
    console.log('closetId 가져오기 성공:', response);
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
    console.log('Successfully added clothes:', response);
    return response;
  } catch (error) {
    console.error('Error adding clothes:', error);
    throw error;
  }
};

// 단일 옷 정보 조회
export const getClothesItemData = async (clothesId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${clothesId}`);
    return response;
  } catch (error) {
    console.error('옷 정보 가져오기 실패:', error);
    throw error;
  }
};

// 전체 옷 조회
export const getClothesList = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/${memberId}/list`);
    console.log(response);
    return response.map((item, index) => ({
      ...item,
      key: item.clothesId || index,
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
    const response = await axiosInstance.get(
      `/api/clothes/${memberId}/${categoryId}`,
      {
        params: { closet_id: closetId },
      }
    );
    return response;
  } catch (error) {
    console.error('카테고리별 조회 실패');
    throw error;
  }
};

// 북마크된 옷 조회
export const getBookmarkedClothes = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/api/clothes/bookmark`, {
      params: { memberId },
    });
    console.log('북마크된 옷 목록 조회 성공: ', response);
    return response;
  } catch (error) {
    console.error('북마크된 옷 목록 조회 실패: ', error);
    throw error;
  }
};

//상대방의 모든 옷 조회
export const getOtherClothesList = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `api/clothes/rtc/${memberId}/list`
    );
    return response;
  } catch (error) {
    console.error('카테고리 목록 불러오는 중 에러 발생:', error);
    throw error;
  }
};

// 상대방의 카테고리별 옷 조회
export const getOtherClothesByCategory = async (
  memberId,
  categoryId,
  closetId
) => {
  try {
    const response = await axiosInstance.get(
      `/api/clothes/rtc/${memberId}/${categoryId}`,
      {
        params: { closet_id: closetId },
      }
    );
    return response;
  } catch (error) {
    console.error('카테고리별 조회 실패');
    throw error;
  }
};
