import axiosInstance from '../axiosInstance';

export const lookbookComment = (lookbook, status) => {
  axiosInstance
    .get(`/api/comment/${lookbook.id}`, {
      params: { status: status },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const commentCreate = (formData, lookbookId) => {
  axiosInstance
    .post(`/api/comment/${lookbookId}`, formData)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const replyCreate = (formData, lookbookId, replyTo) => {
  axiosInstance
    .post(`/api/comment/${lookbookId}/${replyTo}`, formData)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const commentUpdate = (formData, lookbookId, commentId) => {
  axiosInstance
    .put(`/api/comment/${lookbookId}/${commentId}`, formData)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const commentDelete = (lookbookId, commentId) => {
  axiosInstance
    .delete(`/api/comment/${lookbookId}/${commentId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const replyUpdate = (formData, lookbookId, replyId) => {
  axiosInstance
    .put(`/api/comment/${lookbookId}/${replyId}`, formData)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const replyDelete = (lookbookId, replyId) => {
  axiosInstance
    .delete(`/api/comment/${lookbookId}/${replyId}`)
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.error(error);
    });
};
