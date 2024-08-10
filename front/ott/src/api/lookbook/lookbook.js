import axiosInstance from '../axiosInstance';

// 룩북 저장 api
export const lookbookCreate = (formData) => {
  axiosInstance
    .post('api/lookbook/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      console.log('룩북 저장 성공');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// 룩북 수정 api
export const lookbookUpdate = (formData, lookbookId) => {
  axiosInstance
    .put(`api/lookbook/${lookbookId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      console.log('룩북 수정 성공');
    })
    .catch((error) => {
      console.error(error);
    });
};

// 룩북 삭제 api
export const lookbookDelete = async (lookbook) => {
  try {
    axiosInstance.delete(`api/lookbook/${lookbook.id}`);
    console.log('룩북삭제성공');
  } catch (error) {
    console.error(error);
  }
};
