import axiosInstance from "../axiosInstance";

export const getNotificationsList = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/notification/${memberId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('카테고리 목록 불러오는 중 에러 발생:', error);
    throw error;
  }
}

export const getLatestNotification = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/notification/${memberId}/send`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('최신 알림 받아오는데 에러 발생:', error);
    throw error;
  }
}