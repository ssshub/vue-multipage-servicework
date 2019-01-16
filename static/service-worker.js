/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("/static/workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/static/workbox-v3.6.3"});

importScripts(
  "/static/precache-manifest.5d00a091005d13a8f2e322c06b5aff4e.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "ignoreUrlParametersMatching": [/./]
});

workbox.routing.registerRoute(/\/api/, workbox.strategies.cacheFirst({ plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/[^]+?.(png|jpg|jpeg|svg|gif)$/, workbox.strategies.cacheFirst({ "cacheName":"runtime-images", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]}), new workbox.expiration.Plugin({"maxEntries":1000,"maxAgeSeconds":7776000,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/[^]+?.(js|css)$/, workbox.strategies.cacheFirst({ "cacheName":"runtime-js-css", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
