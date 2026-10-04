// 坐标转奥维的下载中转（2026-10-04）
// 只做一件事：有的手机浏览器（华为自带浏览器等）存不了网页里直接生成的文件，
// 网页先把文件放进这台手机浏览器的缓存，再打开 /__dl/ 开头的网址，这里把它当成普通附件交给浏览器下载。
// 文件不上传；其他任何请求一律不管。
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (!new URL(e.request.url).pathname.includes("/__dl/")) return;
  e.respondWith(caches.open("dl").then(c => c.match(e.request)).then(r => r ||
    new Response("文件已经过期，请回到网页重新点一次下载。", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } })));
});
