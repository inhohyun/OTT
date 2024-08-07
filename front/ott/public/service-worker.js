
// // 이 파일은 "오프라인 페이지" 서비스 워커입니다.

// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
// );

// // 캐시 이름을 정의합니다.
// const CACHE = 'pwabuilder-page';

// // 오프라인 대체 페이지를 설정합니다.
// const offlineFallbackPage = 'index.html';

// // 'SKIP_WAITING' 메시지를 받으면 현재 서비스 워커가 활성화될 때까지 대기하지 않고 즉시 활성화합니다.
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });

// // 서비스 워커 설치 이벤트 처리기입니다.
// self.addEventListener('install', async (event) => {
//   // 오프라인 대체 페이지를 캐시에 추가합니다.
//   event.waitUntil(
//     caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
//   );
// });

// // 네비게이션 프리로드가 지원되면 활성화합니다.
// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// // fetch 이벤트 처리기입니다.
// self.addEventListener('fetch', (event) => {
//   // 네비게이션 요청(즉, 페이지 탐색 요청)에 대해서만 응답을 처리합니다.
//   if (event.request.mode === 'navigate') {
//     event.respondWith(
//       (async () => {
//         try {
//           // 네비게이션 프리로드 응답을 사용해봅니다.
//           const preloadResp = await event.preloadResponse;

//           // 프리로드 응답이 있다면 이를 반환합니다.
//           if (preloadResp) {
//             return preloadResp;
//           }

//           // 네트워크 요청을 시도합니다.
//           const networkResp = await fetch(event.request);
//           return networkResp;
//         } catch (error) {
//           // 네트워크 요청이 실패하면 캐시에서 오프라인 대체 페이지를 반환합니다.
//           const cache = await caches.open(CACHE);
//           const cachedResp = await cache.match(offlineFallbackPage);
//           return cachedResp;
//         }
//       })()
//     );
//   }
// });
