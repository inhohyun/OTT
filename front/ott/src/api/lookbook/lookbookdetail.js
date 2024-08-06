import axiosInstance from '../axiosInstance';

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
