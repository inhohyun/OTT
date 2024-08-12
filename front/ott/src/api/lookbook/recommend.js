import axiosInstance from '../axiosInstance';

export const heightWeight = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      'api/recommend/getHeightWeightRecommend',
      {
        params: { memberId: memberId },
      }
    );
    console.log('키추천', response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const bodyType = async (memberId) => {
  try {
    const response = await axiosInstance.get('api/recommend/getBodyRecommend', {
      params: { memberId: memberId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bodyType recommendations:', error);
    throw error;
  }
};

export const getTagRecommend = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/recommend/getTagRecommend`, {
      params: { memberId: memberId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
