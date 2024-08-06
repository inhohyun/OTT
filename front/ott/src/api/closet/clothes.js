import axios from 'axios';
import axiosInstance from '../axiosInstance';

// 옷 추가
export const addClothes = (formData) => {
  return axios
    .post('http://192.168.100.89:8080/api/clothes/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Successfully added clothes:', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding clothes:', error);
      throw error;
    });
};

// 단일 옷 정보 조회
export const getClothesItemData = async (clothesId) => {
  try {
    const response = await axios.get(
      `http://192.168.100.89:8080/api/clothes/${clothesId}`
    );
    return response.data;
  } catch (error) {
    console.error('옷 정보 가져오기 실패:', error);
    throw error;
  }
};

// 전체 옷 조회
export const getClothesList = async (userId) => {
  try {
    const response = await axios.get(
      `http://192.168.100.89:8080/api/clothes/${userId}/list`
    );
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
    await axios.post(
      `http://192.168.100.89:8080/api/clothes/bookmark/${clothesId}`
    );
    console.log(`${clothesId} 북마크 성공`);
  } catch (error) {
    console.error(`${clothesId} 북마크 실패:`, error);
    throw error;
  }
};

// 옷 즐겨찾기 제거
export const unbookmarkClothes = async (clothesId) => {
  try {
    await axios.post(
      `http://192.168.100.89:8080/api/clothes/unbookmark/${clothesId}`
    );
    console.log(`${clothesId} 언북마크 성공`);
  } catch (error) {
    console.error(`${clothesId} 언북마크 실패:`, error);
    throw error;
  }
};

// 옷 수정
export const updateClothes = async (clothesId, formData) => {
  try {
    const response = await axios.put(
      `http://192.168.100.89:8080/api/clothes/${clothesId}`,
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
