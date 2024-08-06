import axiosInstance from '../axiosInstance';

// // 팔로워 수 조회 API
// export const getFollowerCount = async ({ userId }) => {
//   try {
//     const response = await axiosInstance.get({
//       endPoint: `/users/${userId}/followers/count`,
//     });
//     return response;
//   } catch (error) {
//     console.error('팔로워 수 조회중 에러 :', error);
//     throw error;
//   }
// };

//팔로워 목록을 조회하는 API
export const getFollowerList = async (id) => {
  try {
    const response = await axiosInstance.get(
      `api/members/follow/${id}/followers`
    );
    return response;
  } catch (error) {
    console.error('팔로워 목록 조회중 에러 :', error);
    throw error;
  }
};
