const CACHE="hildegarda-v15";
const A=[
"./","./index.html","./styles.css","./app.js","./manifest.webmanifest?v=15","./icon.svg?v=15",
"./assets/img/hero.jpg",
"./assets/img/day1.jpg","./assets/img/day2.jpg","./assets/img/day3.jpg",
"./assets/img/day4.jpg","./assets/img/day5.jpg","./assets/img/day6.jpg",
"./assets/img/day7.jpg","./assets/img/day8.jpg","./assets/img/day9.jpg"
];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET") return;
 const url=new URL(e.request.url);
 if(url.origin!==location.origin) return;
 e.respondWith(fetch(e.request).then(res=>{
   const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return res;
 }).catch(()=>caches.match(e.request)));
});