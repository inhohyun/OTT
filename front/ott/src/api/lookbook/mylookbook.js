// import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const fetchMyLookbooks = async () => {
  try {
    const response = await axiosInstance.get('api/lookbook/mylookbook', {
      params: { memberId: 1 },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.log(error);
  }
};

// import axiosInstance from '../axiosInstance';

// export const fetchMyLookbooks = async (userId) => {
//   try {
//     const response = await axiosInstance.get('api/lookbook/mylookbook', {
//       params: { memberId: userId },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
