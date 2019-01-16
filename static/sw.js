importScripts('/static/RoueHandle.js', '/static/RouteFilter.js')
workbox.skipWaiting();
workbox.clientsClaim();


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "ignoreUrlParametersMatching": [/./]
});


let roueHandle = new RoueHandle()
//只缓存todayHot.html 主页的全部资源
let routeFilter = new RouteFilter(/todayHot.html/)
roueHandle.addFilter(routeFilter)

workbox.routing.registerRoute(roueHandle.create(/\/index.php/),
  workbox.strategies.networkFirst(
    {
      cacheName: 'runtime-api',
      plugins: [new workbox.cacheableResponse.Plugin({"statuses": [0, 200]})],
      networkTimeoutSeconds: 6,
    }
  ), 'GET'
);


workbox.routing.registerRoute(roueHandle.create(/[^]+?.(png|jpg|jpeg|svg|gif)$/), workbox.strategies.cacheFirst({
  "cacheName": "runtime-images",
  plugins: [new workbox.cacheableResponse.Plugin({"statuses": [0, 200]}), new workbox.expiration.Plugin({
    "maxEntries": 1000,
    "maxAgeSeconds": 7776000,
    "purgeOnQuotaError": false
  })]
}), 'GET');



workbox.routing.registerRoute(roueHandle.create(/[^]+?.(js|css)$/), workbox.strategies.cacheFirst({
  "cacheName": "runtime-js-css",
  plugins: [new workbox.cacheableResponse.Plugin({"statuses": [0, 200]})]
}), 'GET');



//其他页面断网时，跳转到offline.html
var networkOnlyHandle = workbox.strategies.networkOnly()
workbox.routing.registerRoute(/[^]+?(?<!todayHot).html/,
  (args) => {
    return networkOnlyHandle.handle(args)
      .catch(() => caches.match('/pages/offline.html'));
  },
  'GET'
);



//v4.0 新增全局异常处理
// workbox.routing.setCatchHandler(({event}) => {
//   console.log(event.request.destination)
//   switch (event.request.destination) {
//     case 'document':
//       return caches.match('');
//       break;
//
//     case 'image':
//       return caches.match('');
//       break;
//
//     case 'font':
//       return caches.match('');
//       break;
//
//     default:
//       // If we don't have a fallback, just return an error response.
//       return Response.error();
//   }
// });

























