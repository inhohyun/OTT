import axiosInstance from '../axiosInstance';

// export const followFeed = async () => {
//   try {
//     const response = await axiosInstance.get('api/lookbook/followings', {
//       params: { memberId: 1 },
//     });
//     // console.log(url);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// 팔로우한 사람 룩북 조회 api
export const followFeed = async (userId) => {
  try {
    const response = axiosInstance.get('/api/lookbook/followings', {
      params: { memberId: userId },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
