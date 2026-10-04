const CACHE_NAME = 'haru-page-cache-v2'; // 버전을 올려 이전 캐시 강제 무효화

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 새 버전 즉시 활성화
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key)) // 꼬인 옛날 캐시 전체 강제 삭제
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 항상 최신 네트워크 데이터를 우선 가져오도록 처리
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
