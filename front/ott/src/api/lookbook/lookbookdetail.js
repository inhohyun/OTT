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

export const lookbookDelete = (lookbook) => {
  axiosInstance
    .delete(`/api/lookbook/${lookbook.id}`)
    .then(() => {
      console.log('룩북삭제성공');
    })
    .catch((error) => {
      console.error(error);
    });
};
