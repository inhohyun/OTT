import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tailwind.css';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// 서비스 워커 등록 코드 추가
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
