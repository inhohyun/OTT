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

// 룩북 상세보기 api
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

export const lookbookDislike = (lookbook) => {
  axiosInstance
    .post(`api/lookbook/${lookbook.id}/dislike`, {
      lookbookId: lookbook.id,
      memberId: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 룩북 좋아요 취소 api

// export const lookbookDislike = (lookbook,userId) => {
//   axiosInstance
//     .post(`api/lookbook/${lookbook.id}/dislike`, {
//       lookbookId: lookbook.id,
//       memberId: userId,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const lookbookLike = (lookbook) => {
  axiosInstance
    .post(`api/lookbook/${lookbook.id}/like`, {
      lookbookId: lookbook.id,
      memberId: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 룩북 좋아요 api
// export const lookbookLike = (lookbook,userId) => {
//   axiosInstance
//     .post(`api/lookbook/${lookbook.id}/like`, {
//       lookbookId: lookbook.id,
//       memberId: userId,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
