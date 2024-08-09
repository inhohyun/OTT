import axiosInstance from '../axiosInstance';

// export const lookbookComment = (lookbookId, status) => {
//   console.log('댓글룩북:', lookbookId.id);
//   axiosInstance
//     .get(`/api/comment/${lookbookId.id}`, {
//       params: { status: status },
//     })
//     .then((response) => {
//       // console.log(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// 댓글 조회 api
export const lookbookComment = async (lookbookId, status) => {
  try {
    // console.log('댓글룩북:', lookbookId);
    const response = await axiosInstance.get(`api/comment/${lookbookId.id}`, {
      params: { status: status },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 댓글 생성 api
export const commentCreate = (formData, lookbookId) => {
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  axiosInstance
    .post(`api/comment/${lookbookId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 답글 생성 api
export const replyCreate = (formData, lookbookId, replyTo) => {
  axiosInstance
    .post(`api/comment/${lookbookId}/${replyTo}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 댓글 수정 api
export const commentUpdate = (formData, lookbookId, commentId) => {
  axiosInstance
    .put(`api/comment/${lookbookId}/${commentId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 댓글 삭제 api
export const commentDelete = (lookbookId, commentId) => {
  axiosInstance
    .delete(`api/comment/${lookbookId}/${commentId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 답글 수정 api
export const replyUpdate = (formData, lookbookId, replyId) => {
  axiosInstance
    .put(`api/comment/${lookbookId}/${replyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 답글 삭제 api
export const replyDelete = (lookbookId, replyId) => {
  axiosInstance
    .delete(`api/comment/${lookbookId}/${replyId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};
