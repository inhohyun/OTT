import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tailwind.css';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

// 서비스 워커 등록 코드 추가
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          '서비스 워커가 다음과 같은 scope에서 등록되었습니다: ',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('서비스워커 등록에 실패했습니다: ', error);
      });
  });
}
