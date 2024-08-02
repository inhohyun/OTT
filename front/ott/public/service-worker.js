// TODO : PWA 공부하고 수정하기
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
