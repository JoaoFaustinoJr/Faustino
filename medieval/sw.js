const CACHE="hildegarda-medieval-v8";
const A=["./","./index.html","./styles.css?v=8","./app.js?v=8","./manifest.webmanifest?v=7","./santa-hildegarda-icon.svg?v=7","../assets/img/hero.jpg",
"../assets/img/day1.jpg","../assets/img/day2.jpg","../assets/img/day3.jpg","../assets/img/day4.jpg","../assets/img/day5.jpg","../assets/img/day6.jpg","../assets/img/day7.jpg","../assets/img/day8.jpg","../assets/img/day9.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
