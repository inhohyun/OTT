// import axiosInstance from '../axiosInstance';

// export const fetchMyLookbooks = async () => {
//   try {
//     const response = await axiosInstance.get('api/lookbook/mylookbook', {
//       params: { memberId: 1 },
//     });
//     console.log('[*] 룩북 데이터 불러오기', response.data);
//     return Array.isArray(response.data) ? response.data : [];
//   } catch (error) {
//     console.log(error);
//   }
// };

// 내 룩북 조회 api

import axiosInstance from '../axiosInstance';

export const fetchMyLookbooks = async (userId) => {
  try {
    const response = await axiosInstance.get('api/lookbook/mylookbook', {
      params: { memberId: userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
