import axiosInstance from '../axiosInstance';

export const sendfittingData = async (
  uid,
  modelImageFile,
  clothImagePath,
  sample,
  category
) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append('uid', uid);
    formData.append('modelImageFile', modelImageFile);
    formData.append('clothImagePath', clothImagePath);
    formData.append('sample', sample);
    formData.append('category', category);

    const respnse = await axiosInstance.post('api/process/ai', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return respnse;
  } catch (error) {
    console.error('AI 옷 피팅 중 에러발생 :', error);
  }
};
