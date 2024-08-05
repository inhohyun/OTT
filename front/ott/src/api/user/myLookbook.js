import { get } from '../axiosInstance';

//나의 룩북 개수 조회 API
export const getLookbookCount = async ({ uid }) => {
  try {
    const response = await get({ endPoint: `/lookbook/count`, id: uid });
    return response;
  } catch (error) {
    console.error('나의 룩북 개수 조회중 에러 :', error);
    throw error;
  }
};

// 나의 공개 룩북 조회 API
export const getPublicLookbook = async ({ uid }) => {
  try {
    const response = await get({ endPoint: `/lookbook/public`, id: uid });
    return response;
  } catch (error) {
    console.error('나의 공개 룩북 조회중 에러 :', error);
    throw error;
  }
};

export const getPrivateLookbook = async ({ uid }) => {
  try {
    const response = await get({ endPoint: `/lookbook/private`, id: uid });
    return response;
  } catch (error) {
    console.error('나의 비공개 룩북 조회중 에러 :', error);
    throw error;
  }
};
