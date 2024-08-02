import { get } from '../axiosInstance';

// 나의 공개 룩북 조회 API
export const getPublicLookbook = async () => {
  try {
    const response = await get({ endPoint: `/lookbook/public` });
    return response;
  } catch (error) {
    console.error('나의 공개 룩북 조회중 에러 :', error);
    throw error;
  }
};

export const getPrivateLookbook = async () => {
  try {
    const response = await get({ endPoint: `/lookbook/private` });
    return response;
  } catch (error) {
    console.error('나의 비공개 룩북 조회중 에러 :', error);
    throw error;
  }
};
