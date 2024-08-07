// import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const fetchMyLookbooks = async () => {
  try {
    const response = await axiosInstance.get('/api/lookbook/mylookbook', {
      params: { uid: 1 },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
