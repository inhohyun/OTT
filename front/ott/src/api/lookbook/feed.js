import axiosInstance from '../axiosInstance';

export const followFeed = async () => {
  try {
    const response = await axiosInstance.get('/api/lookbook/followings', {
      params: { uid: 1 },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const followFeed = (userId) => {
//   axiosInstance
//     .get('/api/lookbook/followings', { params: { uid: userId } })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
