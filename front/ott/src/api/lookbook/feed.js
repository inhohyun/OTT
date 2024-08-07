import axiosInstance from '../axiosInstance';

export const followFeed = () => {
  axiosInstance
    .get('/api/lookbook/followings', { params: { uid: 1 } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
