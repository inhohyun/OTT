// importScripts 함수가 정의되어 있는지 확인 (즉, 웹 워커 컨텍스트에서 실행 중인지 확인)
if (typeof importScripts === 'function') {
  // Workbox 라이브러리를 서비스 워커에 가져옴
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
  );

  // 캐시 이름 정의
  const CACHE = 'pwabuilder-page';
  // 오프라인 대체 페이지 정의
  const offlineFallbackPage = 'index.html';

  // 'SKIP_WAITING' 메시지를 수신하면 즉시 활성화
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  // 서비스 워커 설치 이벤트 핸들러
  self.addEventListener('install', async (event) => {
    event.waitUntil(
      // 캐시에 오프라인 대체 페이지 추가
      caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
    );
  });

  // 네비게이션 프리로드가 지원되는 경우 활성화
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }

  // fetch 이벤트 핸들러
  self.addEventListener('fetch', (event) => {
    // 네비게이션 요청에 대해서만 처리
    if (event.request.mode === 'navigate') {
      event.respondWith(
        (async () => {
          try {
            // 네비게이션 프리로드 응답 사용 시도
            const preloadResp = await event.preloadResponse;

            // 프리로드 응답이 있으면 반환
            if (preloadResp) {
              return preloadResp;
            }

            // 네트워크 요청 시도
            const networkResp = await fetch(event.request);
            return networkResp;
          } catch (error) {
            // 네트워크 요청 실패 시, 캐시에서 오프라인 대체 페이지 반환
            const cache = await caches.open(CACHE);
            const cachedResp = await cache.match(offlineFallbackPage);
            return cachedResp;
          }
        })()
      );
    }
  });
}
