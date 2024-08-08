import axiosInstance from '../axiosInstance';

export const followFeed = async () => {
  try {
    const response = await axiosInstance.get('api/lookbook/followings', {
      params: { memberId: 1 },
    });
    // console.log(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const followFeed = (userId) => {
//   axiosInstance
//     .get('/api/lookbook/followings', { params: { memberId: userId } })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
