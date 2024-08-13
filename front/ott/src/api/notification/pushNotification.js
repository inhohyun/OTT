// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios, { HttpStatusCode } from 'axios';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

async function requestPermission() {
  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }

  console.log('알림 권한이 허용됨');

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
  });
  if (token) {
    console.log('token: ', token);
    axios
      .post(baseUrl + 'api/push/device', { memberId: 1, token: token })
      .then((response) => {
        if (response.status == HttpStatusCode.Ok) {
          console.log('알림 등록 성공');
        } else {
          console.log('알림 등록 실패');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else console.log('Can not get Token');

  onMessage(messaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
    // ...
  });
}

requestPermission();
