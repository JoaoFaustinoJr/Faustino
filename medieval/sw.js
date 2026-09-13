const CACHE="hildegarda-medieval-v27";
const APP_SHELL=[
  "./","./index.html","./styles.css?v=24","./app.js?v=27","./playlist.js?v=27",
  "./manifest.webmanifest?v=7","./santa-hildegarda-icon.svg?v=7",
  "./audio/o-frondens-virga.mp3","./audio/o-virtus-sapientiae.mp3",
  "../assets/img/hero.jpg","../assets/img/day1.jpg","../assets/img/day2.jpg","../assets/img/day3.jpg",
  "../assets/img/day4.jpg","../assets/img/day5.jpg","../assets/img/day6.jpg","../assets/img/day7.jpg",
  "../assets/img/day8.jpg","../assets/img/day9.jpg"
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request);
        const cache=await caches.open(CACHE);
        cache.put("./index.html",fresh.clone()).catch(()=>{});
        return fresh;
      }catch{
        return (await caches.match("./index.html"))||(await caches.match("./"));
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    try{
      const fresh=await fetch(event.request);
      if(fresh&&fresh.ok){
        const cache=await caches.open(CACHE);
        cache.put(event.request,fresh.clone()).catch(()=>{});
      }
      return fresh;
    }catch{
      return cached||Response.error();
    }
  })());
});
