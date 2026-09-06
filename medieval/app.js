const $=id=>document.getElementById(id);
const stateKey="hildegardaMedievalState";
const CLASSIC_IMAGES=Array.from({length:9},(_,i)=>`../assets/img/day${i+1}.jpg`);
const daysPT=[
{title:"A Sabedoria de Deus",verse:"“O Senhor é minha luz e minha salvação.” (Sl 26,1)",med:"Que Santa Hildegarda nos obtenha a graça de buscar, acima de tudo, a Sabedoria que vem de Deus.",ref:"Peçamos um coração atento para reconhecer a presença de Deus nas escolhas de cada dia.",theme:"sapientia",motto:"SAPIENTIA",latin:"In lumine Sapientiae ambulamus.",left:"A sabedoria nasce do silêncio que escuta.",right:"Buscar a verdade com humildade.",symbol:"✦",word:"SABEDORIA"},
{title:"A Luz que vence as trevas",verse:"“Vossa palavra é lâmpada para os meus pés e luz para o meu caminho.” (Sl 118,105)",med:"Peçamos o dom do discernimento, da fé e da clareza para seguir sempre a Luz de Cristo.",ref:"Onde a verdade e a caridade entram, as sombras perdem força.",theme:"lux",motto:"LUX",latin:"Lux in tenebris lucet.",left:"A luz recebida torna-se caminho.",right:"Discernir é caminhar na claridade.",symbol:"✧",word:"LUZ"},
{title:"A Confiança na Providência Divina",verse:"“Lançai sobre o Senhor toda a vossa ansiedade, porque Ele tem cuidado de vós.” (1Pd 5,7)",med:"Entreguemos a Deus aquilo que não conseguimos controlar e descansemos em sua bondade.",ref:"Confiar é permanecer fiel mesmo quando ainda não vemos a resposta.",theme:"providentia",motto:"PROVIDENTIA",latin:"In Deo speramus.",left:"Entregar também é uma forma de fé.",right:"A Providência sustenta o caminho.",symbol:"❦",word:"CONFIANÇA"},
{title:"A Cura Integral do Ser Humano",verse:"“Ele cura os corações quebrantados e cuida das suas feridas.” (Sl 147,3)",med:"Rezemos pela saúde do corpo, da mente e do espírito, e pela cura das feridas da alma.",ref:"A cura cristã alcança a pessoa inteira e a reconduz à esperança.",theme:"sanitas",motto:"SANITAS",latin:"Cura corporis et animae.",left:"Corpo, mente e espírito diante de Deus.",right:"A esperança também participa da cura.",symbol:"✤",word:"CURA"},
{title:"A Força na Enfermidade e na Provação",verse:"“Posso todas as coisas naquele que me fortalece.” (Fl 4,13)",med:"Que Santa Hildegarda nos obtenha a graça de permanecer fiéis a Deus, mesmo nas cruzes e sofrimentos.",ref:"A fortaleza não elimina a fragilidade; faz-nos atravessá-la acompanhados por Deus.",theme:"fortitudo",motto:"FORTITUDO",latin:"In infirmitate fortitudo.",left:"A fragilidade pode tornar-se lugar de confiança.",right:"Perseverar com Deus é também vencer.",symbol:"☩",word:"FORTALEZA"},
{title:"A Criação como Obra de Deus",verse:"“Quão numerosas são as vossas obras, Senhor! Fizestes tudo com sabedoria.” (Sl 103,24)",med:"Contemplemos a criação e bendigamos o Criador, reconhecendo Sua bondade em todas as criaturas.",ref:"Cuidar da criação é também aprender a recebê-la como dom.",theme:"creatio",motto:"CREATIO",latin:"Omnia in Sapientia ordinasti.",left:"A natureza convida à contemplação.",right:"Receber a criação como dom é cuidar.",symbol:"❧",word:"CRIAÇÃO"},
{title:"A Igreja e a Fidelidade à Fé",verse:"“Eu sou a videira, vós sois os ramos. Quem permanece em mim e eu nele, esse dá muito fruto.” (Jo 15,5)",med:"Peçamos a graça de amar a Igreja, ser fiéis aos ensinamentos de Cristo e testemunhar o Evangelho.",ref:"A fé amadurece quando se torna comunhão, serviço e testemunho.",theme:"fides",motto:"FIDES",latin:"Manete in me.",left:"A fé cresce em comunhão.",right:"Permanecer em Cristo é dar fruto.",symbol:"✠",word:"FIDELIDADE"},
{title:"A Humildade e o Serviço",verse:"“Quem quiser ser o primeiro, seja o último de todos e o servo de todos.” (Mc 9,35)",med:"Que Santa Hildegarda nos ensine a colocar nossos dons a serviço dos outros, com humildade e amor.",ref:"O dom floresce plenamente quando se transforma em serviço.",theme:"humilitas",motto:"HUMILITAS",latin:"Servire in caritate.",left:"Servir dá forma concreta ao amor.",right:"Humildade é fazer do dom uma oferta.",symbol:"❀",word:"SERVIÇO"},
{title:"A Entrega Total a Deus",verse:"“Tudo vem de Ti, Senhor, e das Tuas mãos o recebemos.” (1Cr 29,14)",med:"Entreguemos nossa vida, família, necessidades e intenções ao Senhor, pela intercessão de Santa Hildegarda.",ref:"No último dia, a oração torna-se entrega: confiar o caminho inteiro às mãos de Deus.",theme:"oblatio",motto:"OBLATIO",latin:"Totum Deo.",left:"Tudo recebemos; tudo podemos oferecer.",right:"A jornada termina em confiança e gratidão.",symbol:"✥",word:"ENTREGA"}
];;
const daysEN=[
{title:"The Wisdom of God",verse:"“The LORD is my light and my salvation; whom should I fear?” (Ps 27:1)",med:"May Saint Hildegard obtain for us the grace to seek, above all things, the Wisdom that comes from God.",ref:"Let us ask for an attentive heart, able to recognize God's presence in the choices of each day.",theme:"sapientia",motto:"SAPIENTIA",latin:"In lumine Sapientiae ambulamus.",left:"Wisdom is born in the silence that listens.",right:"Seek truth with humility.",symbol:"✦",word:"WISDOM"},
{title:"The Light that Conquers Darkness",verse:"“Your word is a lamp for my feet, a light for my path.” (Ps 119:105)",med:"Let us ask for the gifts of discernment, faith, and clarity, so that we may always follow the Light of Christ.",ref:"Where truth and charity enter, the shadows lose their power.",theme:"lux",motto:"LUX",latin:"Lux in tenebris lucet.",left:"The light we receive becomes a path.",right:"To discern is to walk in the light.",symbol:"✧",word:"LIGHT"},
{title:"Trust in Divine Providence",verse:"“Cast all your worries upon him because he cares for you.” (1 Pt 5:7)",med:"Let us entrust to God what we cannot control and rest in his goodness.",ref:"To trust is to remain faithful even when the answer is not yet visible.",theme:"providentia",motto:"PROVIDENTIA",latin:"In Deo speramus.",left:"Surrender is also an act of faith.",right:"Providence sustains the journey.",symbol:"❦",word:"TRUST"},
{title:"The Integral Healing of the Human Person",verse:"“Healing the brokenhearted, and binding up their wounds.” (Ps 147:3)",med:"Let us pray for the health of body, mind, and spirit, and for the healing of the wounds of the soul.",ref:"Christian healing embraces the whole person and leads us back to hope.",theme:"sanitas",motto:"SANITAS",latin:"Cura corporis et animae.",left:"Body, mind, and spirit before God.",right:"Hope also has a place in healing.",symbol:"✤",word:"HEALING"},
{title:"Strength in Illness and Trial",verse:"“I have the strength for everything through him who empowers me.” (Phil 4:13)",med:"May Saint Hildegard obtain for us the grace to remain faithful to God, even amid crosses and suffering.",ref:"Fortitude does not erase fragility; it helps us pass through it accompanied by God.",theme:"fortitudo",motto:"FORTITUDO",latin:"In infirmitate fortitudo.",left:"Fragility can become a place of trust.",right:"Persevering with God is also victory.",symbol:"☩",word:"FORTITUDE"},
{title:"Creation as the Work of God",verse:"“How varied are your works, LORD! In wisdom you have made them all; the earth is full of your creatures.” (Ps 104:24)",med:"Let us contemplate creation and bless the Creator, recognizing his goodness in every creature.",ref:"To care for creation is also to learn to receive it as a gift.",theme:"creatio",motto:"CREATIO",latin:"Omnia in Sapientia ordinasti.",left:"Nature invites us to contemplation.",right:"To receive creation as gift is to care for it.",symbol:"❧",word:"CREATION"},
{title:"The Church and Fidelity to the Faith",verse:"“I am the vine, you are the branches. Whoever remains in me and I in him will bear much fruit, because without me you can do nothing.” (Jn 15:5)",med:"Let us ask for the grace to love the Church, remain faithful to Christ's teaching, and bear witness to the Gospel.",ref:"Faith matures when it becomes communion, service, and witness.",theme:"fides",motto:"FIDES",latin:"Manete in me.",left:"Faith grows in communion.",right:"To remain in Christ is to bear fruit.",symbol:"✠",word:"FIDELITY"},
{title:"Humility and Service",verse:"“If anyone wishes to be first, he shall be the last of all and the servant of all.” (Mk 9:35)",med:"May Saint Hildegard teach us to place our gifts at the service of others, with humility and love.",ref:"A gift fully blossoms when it becomes service.",theme:"humilitas",motto:"HUMILITAS",latin:"Servire in caritate.",left:"Service gives love a concrete form.",right:"Humility turns a gift into an offering.",symbol:"❀",word:"SERVICE"},
{title:"Total Surrender to God",verse:"“For everything is from you, and what we give is what we have from you.” (1 Chr 29:14)",med:"Let us entrust our life, family, needs, and intentions to the Lord through the intercession of Saint Hildegard.",ref:"On the final day, prayer becomes surrender: placing the entire journey in God's hands.",theme:"oblatio",motto:"OBLATIO",latin:"Totum Deo.",left:"All is received; all can be offered.",right:"The journey ends in trust and gratitude.",symbol:"✥",word:"SURRENDER"}
];
let days=daysPT;

let selected=1,deferredPrompt=null,sx=0,sy=0,homeSx=0,homeSy=0,currentLang="pt";
function load(){
  try{
    const s=JSON.parse(localStorage.getItem(stateKey)||'{"start":"","done":[],"intention":"","ritual":null,"reminderPrompted":false}');
    if(!Array.isArray(s.done))s.done=[];
    if(!("ritual" in s))s.ritual=null;
    if(!("reminderPrompted" in s))s.reminderPrompted=false;
    return s;
  }catch{return{start:"",done:[],intention:"",ritual:null,reminderPrompted:false}}
}
function save(s){localStorage.setItem(stateKey,JSON.stringify(s))}
function isoToday(){const d=new Date(),z=d.getTimezoneOffset()*60000;return new Date(d-z).toISOString().slice(0,10)}
function currentDay(){const s=load();if(!s.start)return 1;const a=new Date(s.start+"T00:00:00"),b=new Date();b.setHours(0,0,0,0);return Math.max(1,Math.min(9,Math.floor((b-a)/86400000)+1))}
function formatDate(d){return new Date(d+"T12:00:00").toLocaleDateString(currentLang==="en"?"en-US":"pt-BR")}
function endDate(){const s=load();const a=new Date((s.start||isoToday())+"T12:00:00");a.setDate(a.getDate()+8);return a.toLocaleDateString(currentLang==="en"?"en-US":"pt-BR")}
function activeRitual(){
  const s=load(),r=s.ritual;
  if(!r||!r.day||!["initial","day","final"].includes(r.step))return null;
  if(s.done.includes(r.day)&&!r.review)return null;
  return r;
}
function stepNumber(step){return step==="initial"?1:step==="day"?2:3}
function updateRitualUI(){
  const r=activeRitual(),step=r?.step||"";
  document.querySelectorAll("[data-ritual-step]").forEach(el=>{
    const name=el.dataset.ritualStep;
    const n=stepNumber(name),cur=step?stepNumber(step):0;
    el.classList.toggle("current",name===step);
    el.classList.toggle("complete",!!step&&n<cur);
  });
}
function renderHome(){
  const s=load(),n=currentDay(),r=activeRitual(),status=$("ritualHomeStatus");
  $("homeDayLabel").textContent=(currentLang==="en"?"Day ":"Dia ")+n+(currentLang==="en"?" of 9":" de 9");
  $("homeDots").innerHTML=days.map((_,i)=>'<span class="day-dot '+(s.done.includes(i+1)?"done":i+1===n?"active":"")+'"></span>').join("");
  if(r){
    const label=currentLang==="en"?(r.step==="initial"?"Opening prayer":r.step==="day"?"Reflection of the day":"Closing prayer"):(r.step==="initial"?"Oração inicial":r.step==="day"?"Reflexão do dia":"Oração final");
    status.hidden=false;
    status.textContent=currentLang==="en"
      ?"Prayer for Day "+r.day+" in progress · step "+stepNumber(r.step)+" of 3 — "+label
      :"Oração do Dia "+r.day+" em andamento · etapa "+stepNumber(r.step)+" de 3 — "+label;
    $("startPrayerBtn").innerHTML=currentLang==="en"
      ?'<span>❦</span> Resume prayer for Day '+r.day+' <b>›</b>'
      :'<span>❦</span> Retomar oração do Dia '+r.day+' <b>›</b>';
  }else if(s.done.includes(n)){
    status.hidden=false;
    status.textContent=currentLang==="en"?"✓ Today's prayer completed · Deo gratias.":"✓ Oração de hoje concluída · Deo gratias.";
    $("startPrayerBtn").innerHTML=currentLang==="en"?'<span>✓</span> Review today’s prayer <b>›</b>':'<span>✓</span> Rever oração de hoje <b>›</b>';
  }else{
    status.hidden=true;
    $("startPrayerBtn").innerHTML=currentLang==="en"?'<span>🙏</span> Begin today’s prayer <b>›</b>':'<span>🙏</span> Iniciar oração de hoje <b>›</b>';
  }
  updateRitualUI();
}
function renderDay(n){
  selected=Math.max(1,Math.min(9,n));
  const d=days[selected-1], page=$("bookPage");
  $("dayNo").textContent=currentLang==="en"?"DAY "+selected:selected+"º DIA";
  $("dayTitle").textContent=d.title;
  $("verse").textContent=d.verse;
  $("meditation").textContent=d.med;
  $("reflection").textContent=d.ref;
  $("dayArt").src=CLASSIC_IMAGES[selected-1];
  $("dayArt").alt=currentLang==="en"?"Artwork for Day "+selected+" — "+d.title:"Arte do "+selected+"º dia — "+d.title;
  $("dayMotto").textContent=d.motto;
  $("dayLatin").textContent=d.latin;
  $("leftNote").textContent=d.left;
  $("rightNote").textContent=d.right;
  $("daySymbol").textContent=d.symbol;
  $("dayThemeWord").textContent=d.word;
  page.dataset.theme=d.theme;
  $("doneBtn").textContent=currentLang==="en"
    ?(load().done.includes(selected)?"Review conclusion with closing prayer ›":"Continue to the closing prayer ›")
    :(load().done.includes(selected)?"Rever conclusão com a oração final ›":"Concluir com a oração final ›");
}
function renderJourney(){const s=load();$("journeyList").innerHTML=days.map((d,i)=>`<button class="journey-row ${s.done.includes(i+1)?"done":""}" data-day="${i+1}"><span class="num">${i+1}</span><span class="meta"><strong>${currentLang==="en"?"Day ":"Dia "}${i+1}</strong><small>${d.title}</small></span><span>›</span></button>`).join("");$("endDateLabel").textContent=endDate();document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{renderDay(+b.dataset.day);go("prayers")})}
function go(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===name));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.go===name));
  if(name==="journey")renderJourney();
  updateRitualUI();
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
function setRitual(day,step,review=false){
  const s=load();
  s.ritual={day,step,review:!!review};
  save(s);renderHome();updateRitualUI();
}
function openRitualStep(step,day,review){
  const s=load(),existing=s.ritual;
  const isReview=review??existing?.review??s.done.includes(day);
  setRitual(day,step,isReview);
  if(step==="day"){
    renderDay(day);go("prayers");return;
  }
  go("wisdom");
  const target=step==="initial"?$("initialSection"):$("finalSection");
  setTimeout(()=>target?.scrollIntoView({behavior:"smooth",block:"start"}),180);
}
function startOrResumePrayer(){
  const r=activeRitual();
  if(r){openRitualStep(r.step,r.day,r.review);return}
  const day=currentDay(),s=load();
  openRitualStep("initial",day,s.done.includes(day));
}
$("startPrayerBtn").onclick=startOrResumePrayer;
$("beginDayBtn").onclick=()=>{
  const r=activeRitual();
  const day=r?.day||currentDay();
  openRitualStep("day",day,r?.review);
};
$("finishPrayerBtn").onclick=()=>{
  const s=load(),r=activeRitual(),day=r?.day||selected||currentDay();
  if(!s.done.includes(day))s.done.push(day);
  s.ritual=null;
  s.lastCompleted=day;
  save(s);
  renderHome();renderJourney();renderDay(day);
  go("home");
  setTimeout(()=>$("ritualHomeStatus")?.scrollIntoView({behavior:"smooth",block:"center"}),140);
};

// A capa também passa a funcionar como a primeira página do livro.
// Deslizar para a esquerda abre diretamente a oração do dia.
$("homeView").addEventListener("touchstart",e=>{
  const t=e.changedTouches[0]; homeSx=t.clientX; homeSy=t.clientY;
},{passive:true});
$("homeView").addEventListener("touchend",e=>{
  const t=e.changedTouches[0],dx=t.clientX-homeSx,dy=t.clientY-homeSy;
  if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.2 && dx<0){
    startOrResumePrayer();
  }
},{passive:true});

$("prevDay").onclick=()=>turn(-1);$("nextDay").onclick=()=>turn(1);
function turn(dir){const n=Math.max(1,Math.min(9,selected+dir));if(n===selected)return;const p=$("bookPage");p.animate([{transform:"translateX(0)",opacity:1},{transform:`translateX(${dir>0?-30:30}px)`,opacity:.25}],{duration:180}).onfinish=()=>{renderDay(n);p.animate([{transform:`translateX(${dir>0?30:-30}px)`,opacity:.25},{transform:"translateX(0)",opacity:1}],{duration:180})}}
$("prayersView").addEventListener("touchstart",e=>{const t=e.changedTouches[0];sx=t.clientX;sy=t.clientY},{passive:true});
$("prayersView").addEventListener("touchend",e=>{
  const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
  if(!(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2))return;
  // No primeiro dia, voltar para a direita retorna à capa.
  if(dx>0 && selected===1){go("home");return}
  // No nono dia, avançar para a esquerda abre a jornada.
  if(dx<0 && selected===9){renderJourney();go("journey");return}
  turn(dx<0?1:-1);
},{passive:true});
$("doneBtn").onclick=()=>{
  const r=activeRitual();
  if(!r||r.day!==selected){
    const s=load();
    openRitualStep("initial",selected,s.done.includes(selected));
    return;
  }
  openRitualStep("final",selected,r.review);
};
$("intentionText").value=load().intention||"";
$("saveIntention").onclick=()=>{const s=load();s.intention=$("intentionText").value.trim();save(s);$("intentionStatus").textContent=currentLang==="en"?"Intention saved on this device.":"Intenção guardada neste aparelho."};
$("startDate").value=load().start||isoToday();
function reminderCalendarUrl(){
  const s=load(),start=(s.start||isoToday()).replaceAll("-","");
  const u=new URL("https://calendar.google.com/calendar/render");
  u.searchParams.set("action","TEMPLATE");
  u.searchParams.set("text",currentLang==="en"?"Saint Hildegard — Novena Prayer":"Santa Hildegarda — Hora da Novena");
  u.searchParams.set("dates",start+"T190000/"+start+"T193000");
  u.searchParams.set("ctz",Intl.DateTimeFormat().resolvedOptions().timeZone||"America/Sao_Paulo");
  u.searchParams.set("recur","RRULE:FREQ=DAILY;COUNT=9");
  u.searchParams.set("details",currentLang==="en"
    ?"It is 7:00 PM. Begin with the Opening Prayer, continue with the reflection of the day, and conclude with the Closing Prayer.\n\nOpen the Illuminated Novena: https://joaofaustinojr.github.io/Faustino/medieval/?lang=en"
    :"São 19h. Comece pela Oração Inicial, siga a reflexão do dia e conclua com a Oração Final.\n\nAbrir a Novena Iluminada: https://joaofaustinojr.github.io/Faustino/medieval/");
  return u.toString();
}
function renderReminderStatus(){
  const s=load(),el=$("reminderStatus");
  if(!el)return;
  el.textContent=currentLang==="en"
    ?(s.reminderOpened
      ?"Google Calendar is prepared for 9 days at 7:00 PM. Confirm the event in Calendar to finish."
      :"The reminder is created in Google Calendar so it can work even when the app is closed.")
    :(s.reminderOpened
      ?"Google Agenda preparado para 9 dias às 19h. Confirme o evento no calendário para concluir."
      :"O lembrete é criado no Google Agenda para funcionar mesmo com o app fechado.");
}
function openReminderCalendar(){
  const s=load();s.reminderOpened=true;save(s);renderReminderStatus();
  window.open(reminderCalendarUrl(),"_blank","noopener");
}
$("saveStart").onclick=()=>{
  const s=load(),first=!s.start;
  s.start=$("startDate").value||isoToday();
  s.ritual=null;
  const ask=!s.reminderPrompted;
  s.reminderPrompted=true;
  save(s);
  renderHome();renderJourney();renderDay(currentDay());renderReminderStatus();
  $("startDate").value=s.start;
  if(ask&&confirm(currentLang==="en"
    ?"Novena started. Would you like to prepare a daily 7:00 PM reminder in Google Calendar for the nine days?"
    :"Novena iniciada. Deseja preparar no Google Agenda um lembrete diário às 19h durante os nove dias?"))openReminderCalendar();
};
$("resetProgress").onclick=()=>{if(confirm(currentLang==="en"?"Restart the progress of this novena?":"Reiniciar o progresso desta novena?")){const s=load();s.done=[];s.ritual=null;s.lastCompleted=null;s.start=$("startDate").value||isoToday();save(s);renderHome();renderJourney();renderDay(currentDay())}};
$("calendarBtn").onclick=openReminderCalendar;
$("shareBtn").onclick=()=>{
  const t=currentLang==="en"
    ?"🌿 *Digital Novena to Saint Hildegard of Bingen*\n\n9 days of prayer, reflection, intention, and music.\nSwipe as if turning the pages of a book.\n\n📖 https://joaofaustinojr.github.io/Faustino/medieval/?lang=en"
    :"🌿 *Novena Digital de Santa Hildegarda de Bingen*\n\n9 dias de oração, reflexão, intenção e música.\nDeslize como as páginas de um livro.\n\n📖 https://joaofaustinojr.github.io/Faustino/medieval/";
  window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank","noopener");
};
function speechFriendly(text){return text
  .replace(/\((?:Sl|Jo|Mc|Fl|Pd|Cr|1Pd|1Cr|2Cr|Rm|Mt|Lc|At|Is|Gn|Ex|Ps|Jn|Mk|Phil|Pt|Chr|1\s*Pt|1\s*Chr)[^)]*\)/gi,"")
  .replace(/\b(?:Sl|Jo|Mc|Fl|Pd|Cr|1Pd|1Cr|2Cr|Ps|Jn|Mk|Phil|1\s*Pt|1\s*Chr)\s*\d+[,:.]?\d*/gi,"")
  .replace(/\s+/g," ").trim()}
function speak(text){if(!("speechSynthesis" in window)){alert(currentLang==="en"?"Read-aloud is not available in this browser.":"Leitura em voz alta não disponível neste navegador.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(speechFriendly(text));u.lang=currentLang==="en"?"en-US":"pt-BR";u.rate=.88;const v=speechSynthesis.getVoices();u.voice=currentLang==="en"?(v.find(x=>x.lang?.toLowerCase().startsWith("en-us"))||v.find(x=>x.lang?.toLowerCase().startsWith("en"))):(v.find(x=>x.lang?.toLowerCase().startsWith("pt-br"))||v.find(x=>x.lang?.toLowerCase().startsWith("pt")))||null;const m=$("music"),prev=!m.paused?m.volume:null;if(prev!==null)m.volume=.06;u.onend=u.onerror=()=>{if(prev!==null)m.volume=prev};speechSynthesis.speak(u)}
document.querySelectorAll(".speak").forEach(b=>b.onclick=()=>speak($(b.dataset.target).innerText));
$("speakDay").onclick=()=>{const d=days[selected-1];speak(d.title+". "+d.verse+" "+d.med+" "+d.ref)};
$("speakTraditional").onclick=()=>speak($("traditionalPrayerText").innerText.replace(currentLang==="en"?"Listen to the full prayers":"Ouvir as orações completas",""));
const music=$("music"),dock=$("musicDock");music.volume=parseFloat($("volume").value);
$("musicQuick").onclick=()=>{dock.classList.add("show");toggleMusic()};
$("musicBtn").onclick=toggleMusic;$("volume").oninput=e=>music.volume=parseFloat(e.target.value);
async function toggleMusic(){dock.classList.add("show");if(music.paused){try{await music.play()}catch{alert(currentLang==="en"?"Tap again to start the music.":"Toque novamente para iniciar a música.")}}else music.pause()}
music.onplaying=()=>{$("musicBtn").textContent="❚❚"};music.onpause=()=>{$("musicBtn").textContent="▶"};

const PRAYERS={
  pt:{
    initial:"Ó Santa Hildegarda de Bingen, virgem e Doutora da Igreja, mulher de profunda fé e de ardente amor a Deus, que ouvistes a voz do Senhor na oração e contemplastes os mistérios da criação e da salvação, ensinai-me a buscar a Verdade com humildade e a amar a Deus sobre todas as coisas. Intercedei por mim junto ao Senhor, para que eu receba as graças de que mais necessito, cresça na sabedoria, na paz, na saúde do corpo e da alma, e no serviço generoso à Igreja e aos irmãos. Amém.",
    final:"Ó Deus, que concedestes a Santa Hildegarda de Bingen a luz do Espírito Santo para contemplar vossos mistérios e manifestar vossa glória na criação, concedei-nos, por sua intercessão, a graça de buscar sempre a vossa Sabedoria, de amar a Igreja e de viver em fidelidade ao Evangelho. Por Cristo, nosso Senhor. Amém.",
    traditional:`<h4>Pai-Nosso</h4><p>Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.</p><h4>Ave-Maria</h4><p>Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.</p><h4>Glória</h4><p>Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.</p><button class="soft-btn" id="speakTraditional">🔊 Ouvir as orações completas</button>`
  },
  en:{
    initial:"O Saint Hildegard of Bingen, virgin and Doctor of the Church, woman of deep faith and ardent love of God, you listened to the Lord's voice in prayer and contemplated the mysteries of creation and salvation. Teach me to seek Truth with humility and to love God above all things. Intercede for me before the Lord, that I may receive the graces I most need, grow in wisdom and peace, in health of body and soul, and in generous service to the Church and to my brothers and sisters. Amen.",
    final:"O God, who granted Saint Hildegard of Bingen the light of the Holy Spirit to contemplate your mysteries and make known your glory in creation, grant us, through her intercession, the grace always to seek your Wisdom, to love the Church, and to live faithfully according to the Gospel. Through Christ our Lord. Amen.",
    traditional:`<h4>Our Father</h4><p>Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.</p><h4>Hail Mary</h4><p>Hail, Mary, full of grace, the Lord is with thee. Blessed art thou among women and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.</p><h4>Glory Be</h4><p>Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning is now, and ever shall be world without end. Amen.</p><button class="soft-btn" id="speakTraditional">🔊 Listen to the full prayers</button>`
  }
};

const I18N={
  pt:{
    title:"Novena Iluminada — Santa Hildegarda de Bingen",status:"ORA • SABE • CONHECE • CURA • VIVE",kicker:"NOVENA DIGITAL DE",saint:"SANTA HILDEGARDA<br>DE BINGEN",subtitle:"Virgem e Doutora da Igreja",quote:"“Ó Sabedoria,<br>que tudo ordenas com suavidade...”",devotee:"devota de Santa Hildegarda de Bingen",
    music:"Música",intention:"Minha intenção",journey:"Minha jornada",installLead:"Leve a novena com você",installSub:"Instale no celular e abra como um aplicativo.",bookHint:"deslize como as páginas de um livro",
    reflection:"Reflexão do dia",sequence:"<span>☩</span> Pai-Nosso <b>•</b> Ave-Maria <b>•</b> Glória <span>☩</span>",fullPrayers:"Orações tradicionais completas",listenReflection:"🔊 Ouvir reflexão",
    wisdomTitle:"Sabedoria e Viriditas",wisdomIntro:"Santa Hildegarda de Bingen foi monja beneditina, mística, teóloga, compositora e Doutora da Igreja. Esta novena propõe nove dias de oração, Palavra de Deus, reflexão e entrega pessoal.",viriditas:"A força vivificante de Deus que tudo cria, sustenta e renova.",
    ritualGuide:"Cada dia da novena começa com a Oração Inicial, segue pela reflexão do dia e se encerra com a Oração Final.",opening:"Oração inicial",closing:"Oração final",step1:"Oração inicial",step2:"Reflexão do dia",step3:"Oração final",
    stage1:"ETAPA 1 DE 3 · PREPARAÇÃO",stage3:"ETAPA 3 DE 3 · CONCLUSÃO",listenOpening:"🔊 Ouvir oração inicial",continueDay:"Prosseguir para a reflexão do dia ›",listenClosing:"🔊 Ouvir oração final",finish:"Amém · Concluir a oração de hoje",
    intentionTitle:"Minha intenção",intentionIntro:"Apresente a Deus, por intercessão de Santa Hildegarda, a sua intenção para esta novena.",intentionPlaceholder:"Escreva aqui a sua intenção...",heart:"Deus conhece o seu coração.",saveIntention:"🔒 Guardar intenção",
    journeyTitle:"Minha Jornada de Oração",journeySub:"9 dias com Santa Hildegarda de Bingen",completion:"Conclusão da novena",prayForUs:"Santa Hildegarda de Bingen, rogai por nós!",
    more:"Mais",startDate:"Data de início",saveStart:"Salvar início",reminderTitle:"⏰ Hora da oração",reminderText:"Ao iniciar a novena, você pode criar um lembrete diário às 19h durante os nove dias.",reminderBtn:"⏰ Ativar lembrete diário às 19h",about:"❦ Sobre Santa Hildegarda & Fontes",share:"Compartilhar no WhatsApp",install:"⬇ Instalar no celular",reset:"Reiniciar progresso",
    navHome:"Início",navPrayers:"Orações",navWisdom:"Sabedoria",navIntention:"Intenção",navMore:"Mais",musicLabel:"Música de Santa Hildegarda",
    aboutTitle:"Sobre & Fontes",langSourceTitle:"Referência católica para a edição em inglês",langSourceText:"As orações tradicionais em inglês seguem as formulações publicadas pela United States Conference of Catholic Bishops (USCCB). As breves citações bíblicas em inglês seguem a New American Bible, Revised Edition (NABRE), publicada no portal bíblico da USCCB."
  },
  en:{
    title:"Illuminated Novena — Saint Hildegard of Bingen",status:"PRAY • KNOW • HEAL • LIVE",kicker:"DIGITAL NOVENA TO",saint:"SAINT HILDEGARD<br>OF BINGEN",subtitle:"Virgin and Doctor of the Church",quote:"“O Wisdom,<br>you who order all things sweetly...”",devotee:"devotee of Saint Hildegard of Bingen",
    music:"Music",intention:"My intention",journey:"My journey",installLead:"Take the novena with you",installSub:"Install it on your phone and open it like an app.",bookHint:"swipe as if turning the pages of a book",
    reflection:"Reflection of the day",sequence:"<span>☩</span> Our Father <b>•</b> Hail Mary <b>•</b> Glory Be <span>☩</span>",fullPrayers:"Traditional Catholic prayers",listenReflection:"🔊 Listen to reflection",
    wisdomTitle:"Wisdom and Viriditas",wisdomIntro:"Saint Hildegard of Bingen was a Benedictine nun, mystic, theologian, composer, and Doctor of the Church. This novena offers nine days of prayer, the Word of God, reflection, and personal surrender.",viriditas:"The life-giving power of God that creates, sustains, and renews all things.",
    ritualGuide:"Each day of the novena begins with the Opening Prayer, continues with the reflection of the day, and concludes with the Closing Prayer.",opening:"Opening Prayer",closing:"Closing Prayer",step1:"Opening prayer",step2:"Reflection of the day",step3:"Closing prayer",
    stage1:"STEP 1 OF 3 · PREPARATION",stage3:"STEP 3 OF 3 · CONCLUSION",listenOpening:"🔊 Listen to opening prayer",continueDay:"Continue to the reflection of the day ›",listenClosing:"🔊 Listen to closing prayer",finish:"Amen · Complete today’s prayer",
    intentionTitle:"My intention",intentionIntro:"Present your intention to God, through the intercession of Saint Hildegard, for this novena.",intentionPlaceholder:"Write your intention here...",heart:"God knows your heart.",saveIntention:"🔒 Save intention",
    journeyTitle:"My Prayer Journey",journeySub:"9 days with Saint Hildegard of Bingen",completion:"Novena completion",prayForUs:"Saint Hildegard of Bingen, pray for us!",
    more:"More",startDate:"Start date",saveStart:"Save start date",reminderTitle:"⏰ Prayer time",reminderText:"When you begin the novena, you can create a daily reminder at 7:00 PM for the nine days.",reminderBtn:"⏰ Set daily 7:00 PM reminder",about:"❦ About Saint Hildegard & Sources",share:"Share on WhatsApp",install:"⬇ Install on phone",reset:"Restart progress",
    navHome:"Home",navPrayers:"Prayers",navWisdom:"Wisdom",navIntention:"Intention",navMore:"More",musicLabel:"Music of Saint Hildegard",
    aboutTitle:"About & Sources",langSourceTitle:"Catholic references for the English edition",langSourceText:"The English traditional prayers follow forms published by the United States Conference of Catholic Bishops (USCCB). The short English Scripture quotations follow the New American Bible, Revised Edition (NABRE), as published on the USCCB Bible website."
  }
};


let ABOUT_PT_HTML=null;
const ABOUT_EN_HTML=`
  <div class="mini-seal">H</div>
  <h2>About &amp; Sources</h2>

  <section class="about-block">
    <div class="about-kicker">SAINT HILDEGARD OF BINGEN</div>
    <h3>About Saint Hildegard</h3>
    <p>Saint Hildegard of Bingen (1098–1179) was a Benedictine nun, abbess, mystic, writer, and composer. She made her religious profession at Disibodenberg and later founded the monastery of Rupertsberg near Bingen. Her life brought together prayer, Sacred Scripture, liturgy, community life, theological reflection, music, and attentive contemplation of creation.</p>
    <p>Among her best-known spiritual works are <em>Scivias</em>, <em>Liber vitae meritorum</em>, <em>Liber divinorum operum</em>, and her extensive correspondence. In these writings, Hildegard presents salvation history in a rich symbolic language and directs the reader toward Christ, conversion of heart, fidelity to the Church, and gratitude for creation as God's gift.</p>
    <p>On October 7, 2012, Pope Benedict XVI proclaimed Saint Hildegard a <strong>Doctor of the Universal Church</strong>. In 2021, her celebration was inscribed in the General Roman Calendar as an optional memorial on <strong>September 17</strong>.</p>
    <div class="about-highlight">Virgin and Doctor of the Church · Optional memorial: September 17</div>
  </section>

  <div class="ritual-divider">❦</div>

  <section class="about-block">
    <div class="about-kicker">ABOUT THIS NOVENA</div>
    <h3>A devotional work</h3>
    <p>This Digital Novena to Saint Hildegard of Bingen is an aid to prayer. Its spirituality keeps God, Sacred Scripture, Christ, the action of the Holy Spirit, conversion, fidelity to the Church, and the humble service of our gifts at the center.</p>
    <p>The content brings together <strong>biblical references</strong>, <strong>traditional Catholic prayers</strong> such as the Our Father, Hail Mary, and Glory Be, official Church documents concerning Saint Hildegard, themes drawn from her writings, and devotional meditations inspired also by the personal experience of the devotee <strong>Tatiana de Oliveira Machado</strong>.</p>
    <p class="editorial-note">Editorial note: the meditations and original formulations in this novena are devotional texts. They are not presented as literal quotations from Saint Hildegard or as official liturgical texts unless a source is expressly identified.</p>
  </section>

  <div class="ritual-divider">❦</div>

  <section class="about-block">
    <div class="about-kicker">BIBLIOGRAPHY AND SOURCES</div>
    <h3>Official and primary sources</h3>

    <div class="source-card">
      <strong>Benedict XVI — Apostolic Letter of October 7, 2012</strong>
      <span>The document proclaiming Saint Hildegard of Bingen, professed nun of the Order of Saint Benedict, a Doctor of the Universal Church.</span>
      <a href="https://www.vatican.va/content/benedict-xvi/en/apost_letters/documents/hf_ben-xvi_apl_20121007_ildegarda-bingen.html" target="_blank" rel="noopener">Read at the Vatican ↗</a>
    </div>

    <div class="source-card">
      <strong>Decree of January 25, 2021 — General Roman Calendar</strong>
      <span>Inscription of Saint Hildegard of Bingen, Virgin and Doctor of the Church, with an optional memorial on September 17.</span>
      <a href="https://www.vatican.va/content/dam/wss/roman_curia/congregations/ccdds/documents/rc_con_ccdds_doc_20210125_decreto-dottori_po.html" target="_blank" rel="noopener">Read the decree ↗</a>
    </div>

    <div class="source-card">
      <strong>Official liturgical texts attached to the 2021 Decree</strong>
      <span>Additions to the Roman Missal, Lectionary, Liturgy of the Hours, and Roman Martyrology, including the proper collect and a reading from Saint Hildegard.</span>
      <a href="https://www.vatican.va/content/dam/wss/roman_curia/congregations/ccdds/documents/adnexus-decreto-dottori.pdf" target="_blank" rel="noopener">Open the official appendix ↗</a>
    </div>

    <div class="source-card">
      <strong>Benedict XVI — General Audiences of September 1 and 8, 2010</strong>
      <span>Catecheses devoted to the life, spirituality, writings, music, and continuing relevance of Saint Hildegard.</span>
      <div class="source-links">
        <a href="https://www.vatican.va/content/benedict-xvi/en/audiences/2010/documents/hf_ben-xvi_aud_20100901.html" target="_blank" rel="noopener">September 1 ↗</a>
        <a href="https://www.vatican.va/content/benedict-xvi/en/audiences/2010/documents/hf_ben-xvi_aud_20100908.html" target="_blank" rel="noopener">September 8 ↗</a>
      </div>
    </div>

    <div class="source-card">
      <strong>Works of Saint Hildegard</strong>
      <span><em>Scivias</em>; <em>Liber vitae meritorum</em>; <em>Liber divinorum operum</em>; <em>Epistolarium</em>. These are primary references for her spirituality and thought.</span>
    </div>

    <div class="source-card">
      <strong>Sacred Scripture — English edition</strong>
      <span>The short English Scripture quotations used in the nine days follow the <strong>New American Bible, Revised Edition (NABRE)</strong>, as published on the Bible website of the United States Conference of Catholic Bishops (USCCB).</span>
      <a href="https://bible.usccb.org/" target="_blank" rel="noopener">USCCB · NABRE Bible ↗</a>
    </div>

    <div class="source-card">
      <strong>Traditional Catholic prayers — English edition</strong>
      <span>The Our Father, Hail Mary, and Glory Be follow traditional forms published by the United States Conference of Catholic Bishops (USCCB).</span>
      <a href="https://www.usccb.org/prayers/prayers-rosary" target="_blank" rel="noopener">USCCB · Prayers of the Rosary ↗</a>
    </div>
  </section>

  <div class="ritual-divider">❦</div>

  <section class="about-block image-credits">
    <div class="about-kicker">VISUAL CREDITS</div>
    <h3>Images and manuscripts</h3>
    <p>The illuminations used on the cover and throughout the nine days were selected from Wikimedia Commons, including medieval manuscript material associated with Saint Hildegard and historical reproductions made available in the public domain or under CC0. The links below lead to the individual file pages with provenance and license information.</p>

    <div class="image-credit-card"><span class="credit-days">COVER · DAY 9</span><strong><em>Hildegard von Bingen</em> — Hildegard receiving divine inspiration and dictating to the scribe Volmar</strong><small>Miniature associated with the <em>Scivias</em>, Rupertsberg Codex, c. 1175 · public domain.</small><a href="https://commons.wikimedia.org/wiki/File:Hildegard_von_Bingen.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAY 1</span><strong><em>Liber scivias domini fig 01</em></strong><small>Illumination from the <em>Scivias</em> manuscript tradition · public domain.</small><a href="https://commons.wikimedia.org/wiki/File:Liber_scivias_domini_fig_01.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAYS 2 · 7</span><strong><em>Scivias, Cod. Sal. X,16, p. 4</em></strong><small>Manuscript page from <em>Scivias</em> · historical reproduction in the public domain.</small><a href="https://commons.wikimedia.org/wiki/File:Scivias,_Cod._Sal._X,16,_p._4.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAYS 3 · 6</span><strong><em>Hildegard von Bingen — Liber Divinorum Operum</em></strong><small>Cosmological representation from <em>Liber divinorum operum</em> · public domain.</small><a href="https://commons.wikimedia.org/wiki/File:Hildegard_von_Bingen_Liber_Divinorum_Operum.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAY 4</span><strong>Saint Hildegard receiving divine inspiration and writing — Lucca codex</strong><small>Detail from <em>Liber divinorum operum</em> · file made available under CC0.</small><a href="https://commons.wikimedia.org/wiki/File:St._Hildegard_von_Bingen_receiving_divine_inspiration_and_writing,_Lucca_codex,_Liber_Divinorum_Operum_(1163-1173),_detail.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAY 5</span><strong><em>Meister des Hildegardis-Codex 001</em> — “The Universe”</strong><small>Image from the Hildegardis/Scivias manuscript tradition · historical reproduction in the public domain.</small><a href="https://commons.wikimedia.org/wiki/File:Meister_des_Hildegardis-Codex_001.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
    <div class="image-credit-card"><span class="credit-days">DAY 8</span><strong>Saint Hildegard — <em>The Salem Scivias</em>, c. 1200</strong><small>Detail from a medieval manuscript · file made available under CC0.</small><a href="https://commons.wikimedia.org/wiki/File:St._Hildegard_von_Bingen,_The_Salem_Scivias_(1200),_detail.jpg" target="_blank" rel="noopener">Wikimedia Commons file ↗</a></div>
  </section>

  <div class="closing-banner">“Monastic liturgy and the interiorization of Sacred Scripture are guiding lines of her thought.”</div>
`;
function q(sel){return document.querySelector(sel)}
function qall(sel){return [...document.querySelectorAll(sel)]}
function setText(sel,val){const el=q(sel);if(el)el.textContent=val}
function setHTML(sel,val){const el=q(sel);if(el)el.innerHTML=val}
function bindTraditionalSpeaker(){
  const b=$("speakTraditional");
  if(b)b.onclick=()=>speak($("traditionalPrayerText").innerText.replace(currentLang==="en"?"Listen to the full prayers":"Ouvir as orações completas",""));
}
function applyLanguage(lang,{persist=true}={}){
  currentLang=lang==="en"?"en":"pt";
  days=currentLang==="en"?daysEN:daysPT;
  if(persist)localStorage.setItem("hildegardaMedievalLang",currentLang);
  document.documentElement.lang=currentLang==="en"?"en-US":"pt-BR";
  const t=I18N[currentLang],p=PRAYERS[currentLang];
  document.title=t.title;
  const statusSpans=qall(".status-row span");if(statusSpans[0])statusSpans[0].textContent=t.status;

  const aboutArticle=q("#aboutView > article");
  if(aboutArticle){
    if(!ABOUT_PT_HTML)ABOUT_PT_HTML=aboutArticle.innerHTML;
    aboutArticle.innerHTML=currentLang==="en"?ABOUT_EN_HTML:ABOUT_PT_HTML;
  }

  qall(".language-switch button").forEach(b=>b.classList.toggle("active",b.dataset.lang===currentLang));

  setText(".title-block .kicker",t.kicker);setHTML(".title-block h1",t.saint);setText(".title-block .subtitle",t.subtitle);setHTML(".title-block blockquote",t.quote);setText(".title-block .dedication em",t.devotee);
  setText("#musicQuick b",t.music);setText('.quick-card[data-go="intention"] b',t.intention);setText('.quick-card[data-go="journey"] b',t.journey);
  setText(".install-copy strong",t.installLead);setText(".install-copy small",t.installSub);setText(".book-hint em",t.bookHint);

  setText("#prayersView .reflection-box h3",t.reflection);setHTML("#prayersView .prayer-sequence",t.sequence);setText("#prayersView .prayer-details summary",t.fullPrayers);setText("#speakDay",t.listenReflection);
  setHTML("#traditionalPrayerText",p.traditional);bindTraditionalSpeaker();

  setText("#wisdomView h2",t.wisdomTitle);setText("#wisdomView > article > p",t.wisdomIntro);setText("#wisdomView .viriditas span",t.viriditas);setText("#wisdomView .ritual-guide span",t.ritualGuide);
  const rsteps=qall("#wisdomView .ritual-step small");if(rsteps[0])rsteps[0].textContent=t.step1;if(rsteps[1])rsteps[1].textContent=t.step2;if(rsteps[2])rsteps[2].textContent=t.step3;
  const psteps=qall("#prayersView .ritual-step small");if(psteps[0])psteps[0].textContent=t.step1;if(psteps[1])psteps[1].textContent=t.step2;if(psteps[2])psteps[2].textContent=t.step3;
  setText("#initialSection .ritual-kicker",t.stage1);setText("#initialSection h3",t.opening);setText("#initialText",p.initial);setText('#initialSection .speak',t.listenOpening);setText("#beginDayBtn",t.continueDay);
  setText("#finalSection .ritual-kicker",t.stage3);setText("#finalSection h3",t.closing);setText("#finalText",p.final);setText('#finalSection .speak',t.listenClosing);setText("#finishPrayerBtn",t.finish);

  setText("#intentionView h2",t.intentionTitle);setText("#intentionView article > p:not(.small-note)",t.intentionIntro);$("intentionText").placeholder=t.intentionPlaceholder;setText("#intentionView .small-note",t.heart);setText("#saveIntention",t.saveIntention);
  setText("#journeyView h2",t.journeyTitle);setText("#journeyView .centered",t.journeySub);setText("#journeyView .completion-card small",t.completion);setText("#journeyView .closing-banner",t.prayForUs);

  setText("#moreView h2",t.more);
  const startLabel=q("#moreView .field-label");if(startLabel){for(const node of [...startLabel.childNodes])if(node.nodeType===3&&node.textContent.trim())node.textContent=t.startDate+"\n          ";}
  setText("#saveStart",t.saveStart);setText("#moreView .reminder-note strong",t.reminderTitle);setText("#moreView .reminder-note span",t.reminderText);setText("#calendarBtn",t.reminderBtn);setText('#moreView [data-go="about"]',t.about);setText("#shareBtn",t.share);setText("#installBtn",t.install);setText("#resetProgress",t.reset);

  const nav=qall(".bottom-nav .nav-item b");[t.navHome,t.navPrayers,t.navWisdom,t.navIntention,t.navMore].forEach((x,i)=>{if(nav[i])nav[i].textContent=x});
  setText("#musicDock small",t.musicLabel);

  setText("#aboutView > article > h2",t.aboutTitle);
  const src=$("englishCatholicSources");if(src){setText("#englishCatholicSources strong",t.langSourceTitle);setText("#englishCatholicSources > span",t.langSourceText);}

  renderHome();renderDay(selected||currentDay());renderJourney();renderReminderStatus();updateRitualUI();
  if(isStandalone())setInstalledUI();
}
function initLanguage(){
  const urlLang=new URLSearchParams(location.search).get("lang");
  const saved=localStorage.getItem("hildegardaMedievalLang");
  const detected=(navigator.language||"").toLowerCase().startsWith("en")?"en":"pt";
  applyLanguage(urlLang==="en"||urlLang==="pt"?urlLang:(saved||detected),{persist:!!saved||!!urlLang});
  qall(".language-switch button").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));
}

function installButtons(){return [$("installHomeBtn"),$("installBtn")].filter(Boolean)}
function isStandalone(){return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone===true}
function setInstalledUI(){
  installButtons().forEach(b=>{b.textContent=currentLang==="en"?"✓ App installed":"✓ App instalado";b.disabled=true});
  const h=$("installHelp"); if(h){h.hidden=false;h.textContent=currentLang==="en"?"The Novena is already installed on this device.":"A Novena já está instalada neste aparelho."}
}
function showInstallHelp(){
  const h=$("installHelp"); if(!h)return;
  const ua=navigator.userAgent||"";
  const ios=/iPhone|iPad|iPod/i.test(ua);
  const android=/Android/i.test(ua);
  h.hidden=false;
  if(ios){
    h.textContent=currentLang==="en"?"In Safari: tap Share and choose “Add to Home Screen”.":"No Safari: toque em Compartilhar e escolha “Adicionar à Tela de Início”.";
  }else if(android){
    h.textContent=currentLang==="en"?"In Chrome: tap the ⋮ menu and choose “Install app” or “Add to Home screen”.":"No Chrome: toque no menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”.";
  }else{
    h.textContent=currentLang==="en"?"Open the browser menu and look for “Install app” or “Add to Home screen”.":"Abra o menu do navegador e procure “Instalar aplicativo” ou “Adicionar à tela inicial”.";
  }
}
async function requestInstall(){
  if(isStandalone()){setInstalledUI();return}
  if(deferredPrompt){
    deferredPrompt.prompt();
    const choice=await deferredPrompt.userChoice;
    if(choice && choice.outcome==="accepted"){
      installButtons().forEach(b=>{b.textContent=currentLang==="en"?"Installing…":"Instalando…";b.disabled=true});
    }else{
      showInstallHelp();
    }
    deferredPrompt=null;
  }else{
    showInstallHelp();
  }
}
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();
  deferredPrompt=e;
  installButtons().forEach(b=>{b.disabled=false;b.textContent=currentLang==="en"?(b.id==="installBtn"?"⬇ Install on phone":"Install on phone"):(b.id==="installBtn"?"⬇ Instalar no celular":"Instalar no celular")});
});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;setInstalledUI()});
installButtons().forEach(b=>b.onclick=requestInstall);
if(isStandalone())setInstalledUI();
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js?v=11").catch(()=>{});
initLanguage();
renderHome();renderDay(currentDay());renderJourney();renderReminderStatus();updateRitualUI();

(function enableJourneyBookSwipe(){
  let jx=0,jy=0;
  const v=$("journeyView");
  v.addEventListener("touchstart",e=>{const t=e.changedTouches[0];jx=t.clientX;jy=t.clientY},{passive:true});
  v.addEventListener("touchend",e=>{
    const t=e.changedTouches[0],dx=t.clientX-jx,dy=t.clientY-jy;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2&&dx>0){
      renderDay(9);go("prayers");
    }
  },{passive:true});
})();