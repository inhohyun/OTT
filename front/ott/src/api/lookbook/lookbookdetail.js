import axiosInstance from '../axiosInstance';

export const lookbookDetail = async (lookbookId) => {
  try {
    const response = await axiosInstance.get(`api/lookbook/${lookbookId}`, {
      params: { memberId: 1 },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// // 룩북 상세보기 api
// export const lookbookDetail = async (lookbookId, userId) => {
//   try {
//     const response = await axiosInstance.get(`api/lookbook/${lookbookId}`, {
//       params: { uid: userId },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const lookbookDislike = (lookbookId) => {
  axiosInstance
    .post(`api/lookbook/${lookbookId}/dislike`, {
      lookbookId: lookbookId,
      memberId: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// // 룩북 좋아요 취소 api

// export const lookbookDislike = (lookbookId, userId) => {
//   axiosInstance
//     .post(`api/lookbook/${lookbookId}/dislike`, {
//       lookbookId: lookbookId,
//       memberId: userId,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const lookbookLike = (lookbookId) => {
  axiosInstance
    .post(`api/lookbook/${lookbookId}/like`, {
      lookbookId: lookbookId,
      memberId: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// // 룩북 좋아요 api
// export const lookbookLike = (lookbookId, userId) => {
//   axiosInstance
//     .post(`api/lookbook/${lookbookId}/like`, {
//       lookbookId: lookbookId,
//       memberId: userId,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
