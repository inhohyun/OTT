import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const inviteMeeting = async (data) => {
    axios.post(`${baseURL}api/notification/meeting`, data)
    .then(response => {
        if (response && response.data) {
            console.log(response);
            
        }
    }).catch(error => {
        console.error(error);
    }).finally(() => {
        console.log('WebRTC 세션 초대 실패');
    });
}