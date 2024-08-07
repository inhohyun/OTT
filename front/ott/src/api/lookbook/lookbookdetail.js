import axiosInstance from '../axiosInstance';

export const lookbookDetail = async (lookbookId) => {
  try {
    const response = await axiosInstance.get(`api/lookbook/${lookbookId}`, {
      params: { uid: 1 },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
    .post(`/api/lookbook/${lookbook.id}/dislike`, {
      lookbookId: lookbook.id,
      uid: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// export const lookbookDislike = (lookbook,userId) => {
//   axiosInstance
//     .post(`/api/lookbook/${lookbook.id}/dislike`, {
//       lookbookId: lookbook.id,
//       uid: userId,
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
    .post(`/api/lookbook/${lookbook.id}/like`, {
      lookbookId: lookbook.id,
      uid: '1',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// export const lookbookLike = (lookbook,userId) => {
//   axiosInstance
//     .post(`/api/lookbook/${lookbook.id}/like`, {
//       lookbookId: lookbook.id,
//       uid: userId,
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
