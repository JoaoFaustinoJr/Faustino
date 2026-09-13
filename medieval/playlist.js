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

/* v28 — Credo Apostólico no início e Salve Rainha na conclusão */
(() => {
  const DEVOTIONAL_EXTRA={
    pt:{
      creedTitle:"✠ CREDO APOSTÓLICO",
      creed:"Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.",
      salveTitle:"❦ SALVE RAINHA",
      salve:"Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
      guide:"Cada dia da novena começa com a persignação, o Credo Apostólico e a Oração Inicial; segue pela reflexão do dia e se encerra com a Oração Final e a Salve Rainha.",
      opening:"Preparação e oração inicial",
      closing:"Oração final e Salve Rainha",
      listenOpening:"🔊 Ouvir início completo",
      listenClosing:"🔊 Ouvir conclusão completa"
    },
    en:{
      creedTitle:"✠ APOSTLES’ CREED",
      creed:"I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
      salveTitle:"❦ HAIL, HOLY QUEEN",
      salve:"Hail, holy Queen, mother of mercy, hail, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.",
      guide:"Each day begins with the Sign of the Cross, the Apostles’ Creed, and the Opening Prayer; continues with the reflection of the day; and ends with the Closing Prayer and the Hail, Holy Queen.",
      opening:"Preparation and opening prayer",
      closing:"Closing prayer and Hail, Holy Queen",
      listenOpening:"🔊 Listen to the full opening",
      listenClosing:"🔊 Listen to the full conclusion"
    },
    de:{
      creedTitle:"✠ APOSTOLISCHES GLAUBENSBEKENNTNIS",
      creed:"Ich glaube an Gott, den Vater, den Allmächtigen, den Schöpfer des Himmels und der Erde. Und an Jesus Christus, seinen eingeborenen Sohn, unsern Herrn, empfangen durch den Heiligen Geist, geboren von der Jungfrau Maria, gelitten unter Pontius Pilatus, gekreuzigt, gestorben und begraben, hinabgestiegen in das Reich des Todes, am dritten Tage auferstanden von den Toten, aufgefahren in den Himmel; er sitzt zur Rechten Gottes, des allmächtigen Vaters; von dort wird er kommen, zu richten die Lebenden und die Toten. Ich glaube an den Heiligen Geist, die heilige katholische Kirche, Gemeinschaft der Heiligen, Vergebung der Sünden, Auferstehung der Toten und das ewige Leben. Amen.",
      salveTitle:"❦ SALVE REGINA",
      salve:"Sei gegrüßt, o Königin, Mutter der Barmherzigkeit; unser Leben, unsere Wonne und unsere Hoffnung, sei gegrüßt! Zu dir rufen wir verbannte Kinder Evas; zu dir seufzen wir trauernd und weinend in diesem Tal der Tränen. Wohlan denn, unsere Fürsprecherin, wende deine barmherzigen Augen uns zu und nach diesem Elend zeige uns Jesus, die gebenedeite Frucht deines Leibes. O gütige, o milde, o süße Jungfrau Maria! Bitte für uns, o heilige Gottesmutter, auf dass wir würdig werden der Verheißungen Christi. Amen.",
      guide:"Jeder Tag beginnt mit dem Kreuzzeichen, dem Apostolischen Glaubensbekenntnis und dem Eröffnungsgebet; darauf folgt die Tagesbetrachtung; den Abschluss bilden Schlussgebet und Salve Regina.",
      opening:"Vorbereitung und Eröffnungsgebet",
      closing:"Schlussgebet und Salve Regina",
      listenOpening:"🔊 Den ganzen Beginn anhören",
      listenClosing:"🔊 Den ganzen Abschluss anhören"
    },
    es:{
      creedTitle:"✠ CREDO DE LOS APÓSTOLES",
      creed:"Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
      salveTitle:"❦ SALVE, REINA",
      salve:"Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce siempre Virgen María! Ruega por nosotros, santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén.",
      guide:"Cada día comienza con la persignación, el Credo de los Apóstoles y la Oración Inicial; continúa con la reflexión del día y concluye con la Oración Final y la Salve, Reina.",
      opening:"Preparación y oración inicial",
      closing:"Oración final y Salve, Reina",
      listenOpening:"🔊 Escuchar el inicio completo",
      listenClosing:"🔊 Escuchar la conclusión completa"
    }
  };

  const style=document.createElement("style");
  style.textContent=`
    .devotional-extra{margin:12px 0 14px;padding:14px 15px;border:1px solid rgba(184,138,42,.58);border-radius:14px;background:linear-gradient(180deg,rgba(255,249,230,.92),rgba(245,232,194,.78));box-shadow:inset 0 0 0 2px rgba(255,253,242,.45)}
    .devotional-extra-kicker{margin-bottom:8px;text-align:center;font-family:Cinzel,serif;font-size:.67rem;font-weight:800;letter-spacing:.12em;color:var(--green)}
    .devotional-extra p{margin:0;font-family:"Cormorant Garamond",serif;font-size:1.08rem;font-weight:600;line-height:1.43;color:#443b2c}
    .devotional-extra.salve-card{background:radial-gradient(circle at 50% 0,rgba(255,238,177,.42),transparent 38%),linear-gradient(180deg,rgba(255,249,230,.94),rgba(241,228,190,.82))}
    @media(max-width:520px){.devotional-extra{padding:12px}.devotional-extra p{font-size:1.03rem;line-height:1.4}.devotional-extra-kicker{font-size:.62rem}}
  `;
  document.head.appendChild(style);

  const langKey=()=>{
    const key=(document.documentElement.lang||"pt").slice(0,2).toLowerCase();
    return ["pt","en","de","es"].includes(key)?key:"pt";
  };

  function ensureCards(){
    const initialText=document.getElementById("initialText");
    const persignation=document.getElementById("persignationCard");
    if(initialText&&persignation&&!document.getElementById("creedCard")){
      const card=document.createElement("div");
      card.className="devotional-extra creed-card";
      card.id="creedCard";
      card.innerHTML='<div class="devotional-extra-kicker" id="creedTitle"></div><p id="creedText"></p>';
      persignation.insertAdjacentElement("afterend",card);
    }
    const finalText=document.getElementById("finalText");
    if(finalText&&!document.getElementById("salveCard")){
      const card=document.createElement("div");
      card.className="devotional-extra salve-card";
      card.id="salveCard";
      card.innerHTML='<div class="devotional-extra-kicker" id="salveTitle"></div><p id="salveText"></p>';
      finalText.insertAdjacentElement("afterend",card);
    }
  }

  function bindExtendedAudio(){
    if(typeof bindSpeechControl!=="function"||typeof speakPrayerSequence!=="function")return;
    const key=langKey(),x=DEVOTIONAL_EXTRA[key];
    const initial=document.getElementById("speakInitial");
    if(initial){
      initial.dataset.speechBase=x.listenOpening;
      initial.textContent=x.listenOpening;
      bindSpeechControl(initial,()=>speakPrayerSequence(
        [PERSIGNATION[key].text,x.creed,PRAYERS[key].initial],
        {rate:.76,pause:720,musicLevel:.045},initial
      ));
    }
    const final=document.getElementById("speakFinal");
    if(final){
      final.dataset.speechBase=x.listenClosing;
      final.textContent=x.listenClosing;
      bindSpeechControl(final,()=>speakPrayerSequence(
        [PRAYERS[key].final,x.salve],
        {rate:.76,pause:720,musicLevel:.045},final
      ));
    }
  }

  function renderExtras(){
    ensureCards();
    const key=langKey(),x=DEVOTIONAL_EXTRA[key];
    const creedTitle=document.getElementById("creedTitle");
    const creedText=document.getElementById("creedText");
    const salveTitle=document.getElementById("salveTitle");
    const salveText=document.getElementById("salveText");
    if(creedTitle)creedTitle.textContent=x.creedTitle;
    if(creedText)creedText.textContent=x.creed;
    if(salveTitle)salveTitle.textContent=x.salveTitle;
    if(salveText)salveText.textContent=x.salve;
    const guide=document.querySelector("#wisdomView .ritual-guide span");
    if(guide)guide.textContent=x.guide;
    const opening=document.querySelector("#initialSection h3");
    if(opening)opening.textContent=x.opening;
    const closing=document.querySelector("#finalSection h3");
    if(closing)closing.textContent=x.closing;
    bindExtendedAudio();
  }

  renderExtras();
  new MutationObserver(()=>queueMicrotask(renderExtras)).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
})();
