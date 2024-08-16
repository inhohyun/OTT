import axiosInstance from '../axiosInstance';

// 룩북 저장 api
export const lookbookCreate = async (formData) => {
  try {
    const response = await axiosInstance.post('api/lookbook/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    // console.log('룩북 저장 성공');
    return response.data;
  } catch (error) {
    // console.error('Error:', error.response?.data);
  }
};

// 룩북 수정 api
export const lookbookUpdate = async (formData, lookbookId) => {
  try {
    const response = await axiosInstance.put(
      `api/lookbook/${lookbookId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response;
  } catch (error) {
    // console.error(error);
  }
};

// 룩북 삭제 api
export const lookbookDelete = async (lookbookId) => {
  try {
    axiosInstance.delete(`api/lookbook/${lookbookId}`);
    // console.log('룩북삭제성공');
  } catch (error) {
    // console.error(error);
  }
};
