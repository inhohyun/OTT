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
    const response = await axiosInstance.get(`api/comment/${lookbookId}`, {
      params: { status: status },
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.error(error);
    // throw error;
  }
};

// 댓글 생성 API
export const commentCreate = async (formData, lookbookId) => {
  try {
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    const response = await axiosInstance.post(
      `api/comment/${lookbookId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.status;
  } catch (error) {
    // console.error('댓글 생성 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};

// 답글 생성 API
export const replyCreate = async (formData, lookbookId, replyTo) => {
  try {
    const response = await axiosInstance.post(
      `api/comment/${lookbookId}/${replyTo}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.status;
  } catch (error) {
    // console.error('답글 생성 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};

// 댓글 수정 API
export const commentUpdate = async (formData, lookbookId, commentId) => {
  try {
    const response = await axiosInstance.put(
      `api/comment/${lookbookId}/${commentId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.status;
  } catch (error) {
    // console.error('댓글 수정 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};

// 댓글 삭제 API
export const commentDelete = async (lookbookId, commentId) => {
  try {
    const response = await axiosInstance.delete(
      `api/comment/${lookbookId}/${commentId}`
    );
    return response.status;
  } catch (error) {
    // console.error('댓글 삭제 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};

// 답글 수정 API
export const replyUpdate = async (formData, lookbookId, replyId) => {
  try {
    const response = await axiosInstance.put(
      `api/comment/${lookbookId}/${replyId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.status;
  } catch (error) {
    // console.error('답글 수정 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};

// 답글 삭제 API
export const replyDelete = async (lookbookId, replyId) => {
  try {
    const response = await axiosInstance.delete(
      `api/comment/${lookbookId}/${replyId}`
    );
    return response.status;
  } catch (error) {
    // console.error('답글 삭제 실패:', error);
    throw error; // 필요에 따라 에러를 다시 던질 수 있습니다.
  }
};
