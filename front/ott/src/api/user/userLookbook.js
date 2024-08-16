import axiosInstance from '../axiosInstance';

// 공개 룩북 목록 조회
export const getPublicLookbookList = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/api/lookbook/public`, {
      params: { memberId: memberId },
    });

    return response;
  } catch (error) {
    // console.error('Error getting public lookbook list:', error);
    throw error;
  }
};

export const getPrivateLookbookList = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/api/lookbook/private`, {
      params: { memberId: memberId },
    });

    return response;
  } catch (error) {
    // console.error('Error getting private lookbook list:', error);
    throw error;
  }
};
