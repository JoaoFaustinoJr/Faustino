(() => {
  const music = document.getElementById("music");
  const dock = document.getElementById("musicDock");
  const playBtn = document.getElementById("musicBtn");
  if (!music || !dock || !playBtn) return;

  const TRACK_KEY = "hildegardaMedievalTrack";
  const WANTED_KEY = "hildegardaMedievalMusicWanted";
  const tracks = [
    {title:"O frondens virga",src:"./audio/o-frondens-virga.mp3",credit:"Makemi · Wikimedia Commons · CC BY-SA 3.0"},
    {title:"O virtus Sapientiae",src:"./audio/o-virtus-sapientiae.mp3",credit:"San Francisco Girls Chorus · Creative Commons Attribution"}
  ];

  let index = Number.parseInt(localStorage.getItem(TRACK_KEY) || "0", 10);
  if (!Number.isFinite(index) || index < 0 || index >= tracks.length) index = 0;
  let changingTrack = false;

  music.loop = false;
  while (music.firstChild) music.removeChild(music.firstChild);

  const info = dock.querySelector("div");
  if (info) info.classList.add("music-track-info");
  const label = info?.querySelector("small");
  const title = info?.querySelector("strong");
  const credit = document.createElement("span");
  credit.className = "music-credit";
  credit.setAttribute("aria-live", "polite");
  info?.appendChild(credit);

  const nav = document.createElement("div");
  nav.className = "playlist-nav";
  nav.innerHTML = '<button type="button" class="track-nav" data-dir="-1" aria-label="Música anterior">‹</button><span class="track-count" aria-hidden="true"></span><button type="button" class="track-nav" data-dir="1" aria-label="Próxima música">›</button>';
  dock.insertBefore(nav, playBtn);
  dock.classList.add("playlist-enabled");

  const style = document.createElement("style");
  style.textContent = `
    .music-dock.playlist-enabled{grid-template-columns:minmax(0,1fr) auto 44px minmax(82px,130px)}
    .music-track-info{min-width:0}
    .music-track-info strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .music-credit{display:block;margin-top:1px;font:500 .58rem/1.2 Inter,sans-serif;color:#e9d8a9;opacity:.86;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .playlist-nav{display:flex;align-items:center;gap:4px}
    .music-dock .playlist-nav .track-nav{width:30px;height:30px;font-size:1.15rem;line-height:1;padding:0}
    .track-count{min-width:26px;text-align:center;font:700 .62rem Inter,sans-serif;color:#f3d477}
    @media(max-width:560px){
      .music-dock.playlist-enabled{grid-template-columns:minmax(0,1fr) auto 42px;gap:7px;padding:8px 10px}
      .music-dock.playlist-enabled input[type="range"]{grid-column:1/-1;width:100%;height:16px}
      .music-credit{font-size:.53rem}
      .music-dock .playlist-nav .track-nav{width:27px;height:27px}
      .track-count{min-width:22px;font-size:.57rem}
    }
  `;
  document.head.appendChild(style);

  function wanted(){return localStorage.getItem(WANTED_KEY)==="1"}
  function updateMeta(){
    const t=tracks[index];
    if(label)label.textContent="Música de Santa Hildegarda";
    if(title)title.textContent=t.title;
    credit.textContent=t.credit;
    const count=nav.querySelector(".track-count");
    if(count)count.textContent=`${index+1}/${tracks.length}`;
    dock.title=`${t.title} — ${t.credit}`;
  }
  function setTrack(nextIndex,shouldPlay=false){
    index=(nextIndex+tracks.length)%tracks.length;
    localStorage.setItem(TRACK_KEY,String(index));
    updateMeta();
    changingTrack=true;
    music.src=tracks[index].src;
    music.load();
    changingTrack=false;
    if(shouldPlay){
      localStorage.setItem(WANTED_KEY,"1");
      music.play().catch(()=>{});
    }
  }
  function step(dir,forcePlay=false){
    const wasPlaying=!music.paused||wanted();
    setTrack(index+dir,forcePlay||wasPlaying);
  }

  nav.addEventListener("click",event=>{
    const button=event.target.closest("button[data-dir]");
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    step(Number(button.dataset.dir),true);
  });
  music.addEventListener("ended",()=>step(1,true));
  music.addEventListener("error",()=>{
    if(changingTrack)return;
    const next=(index+1)%tracks.length;
    if(next!==index)setTrack(next,wanted());
  });

  setTrack(index,false);
  updateMeta();

  const quick=document.getElementById("musicQuick");
  const quickText=quick?.querySelector("b");
  function updateQuickLabel(){
    if(!quickText)return;
    const lang=(document.documentElement.lang||"pt").slice(0,2);
    quickText.textContent=lang==="en"?"Listen":lang==="de"?"Musik hören":lang==="es"?"Escuchar":"Ouvir música";
  }
  updateQuickLabel();
  new MutationObserver(updateQuickLabel).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
})();
