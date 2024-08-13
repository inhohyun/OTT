import axiosInstance from '../axiosInstance';

export const heightWeight = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      'api/recommend/getHeightWeightRecommend',
      {
        params: { memberId: memberId },
      }
    );
    return response.data;
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
