const CACHE="hildegarda-v5";
const A=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icon.svg",
"./assets/hero.svg","./assets/day1.svg","./assets/day2.svg","./assets/day3.svg","./assets/day4.svg",
"./assets/day5.svg","./assets/day6.svg","./assets/day7.svg","./assets/day8.svg","./assets/day9.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;if(new URL(e.request.url).origin!==location.origin)return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res})))})