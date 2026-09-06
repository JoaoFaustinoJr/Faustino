const CACHE="hildegarda-v9";
const A=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icon.svg",
"./assets/img/hero.webp","./assets/img/day1.webp","./assets/img/day2.webp","./assets/img/day3.webp",
"./assets/img/day4.webp","./assets/img/day5.webp","./assets/img/day6.webp","./assets/img/day7.webp",
"./assets/img/day8.webp","./assets/img/day9.webp"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;if(new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match(e.request)))})