const $=id=>document.getElementById(id);
const stateKey="hildegardaMedievalState";
const CLASSIC_IMAGES=Array.from({length:9},(_,i)=>`../assets/img/day${i+1}.jpg`);
const days=[
{title:"A Sabedoria de Deus",verse:"“O Senhor é minha luz e minha salvação.” (Sl 26,1)",med:"Que Santa Hildegarda nos obtenha a graça de buscar, acima de tudo, a Sabedoria que vem de Deus.",ref:"Peçamos um coração atento para reconhecer a presença de Deus nas escolhas de cada dia.",theme:"sapientia",motto:"SAPIENTIA",latin:"In lumine Sapientiae ambulamus.",left:"A sabedoria nasce do silêncio que escuta.",right:"Buscar a verdade com humildade.",symbol:"✦",word:"SABEDORIA"},
{title:"A Luz que vence as trevas",verse:"“Vossa palavra é lâmpada para os meus pés e luz para o meu caminho.” (Sl 118,105)",med:"Peçamos o dom do discernimento, da fé e da clareza para seguir sempre a Luz de Cristo.",ref:"Onde a verdade e a caridade entram, as sombras perdem força.",theme:"lux",motto:"LUX",latin:"Lux in tenebris lucet.",left:"A luz recebida torna-se caminho.",right:"Discernir é caminhar na claridade.",symbol:"✧",word:"LUZ"},
{title:"A Confiança na Providência Divina",verse:"“Lançai sobre o Senhor toda a vossa ansiedade, porque Ele tem cuidado de vós.” (1Pd 5,7)",med:"Entreguemos a Deus aquilo que não conseguimos controlar e descansemos em sua bondade.",ref:"Confiar é permanecer fiel mesmo quando ainda não vemos a resposta.",theme:"providentia",motto:"PROVIDENTIA",latin:"In Deo speramus.",left:"Entregar também é uma forma de fé.",right:"A Providência sustenta o caminho.",symbol:"❦",word:"CONFIANÇA"},
{title:"A Cura Integral do Ser Humano",verse:"“Ele cura os corações quebrantados e cuida das suas feridas.” (Sl 147,3)",med:"Rezemos pela saúde do corpo, da mente e do espírito, e pela cura das feridas da alma.",ref:"A cura cristã alcança a pessoa inteira e a reconduz à esperança.",theme:"sanitas",motto:"SANITAS",latin:"Cura corporis et animae.",left:"Corpo, mente e espírito diante de Deus.",right:"A esperança também participa da cura.",symbol:"✤",word:"CURA"},
{title:"A Força na Enfermidade e na Provação",verse:"“Posso todas as coisas naquele que me fortalece.” (Fl 4,13)",med:"Que Santa Hildegarda nos obtenha a graça de permanecer fiéis a Deus, mesmo nas cruzes e sofrimentos.",ref:"A fortaleza não elimina a fragilidade; faz-nos atravessá-la acompanhados por Deus.",theme:"fortitudo",motto:"FORTITUDO",latin:"In infirmitate fortitudo.",left:"A fragilidade pode tornar-se lugar de confiança.",right:"Perseverar com Deus é também vencer.",symbol:"☩",word:"FORTALEZA"},
{title:"A Criação como Obra de Deus",verse:"“Quão numerosas são as vossas obras, Senhor! Fizestes tudo com sabedoria.” (Sl 103,24)",med:"Contemplemos a criação e bendigamos o Criador, reconhecendo Sua bondade em todas as criaturas.",ref:"Cuidar da criação é também aprender a recebê-la como dom.",theme:"creatio",motto:"CREATIO",latin:"Omnia in Sapientia ordinasti.",left:"A natureza convida à contemplação.",right:"Receber a criação como dom é cuidar.",symbol:"❧",word:"CRIAÇÃO"},
{title:"A Igreja e a Fidelidade à Fé",verse:"“Eu sou a videira, vós sois os ramos. Quem permanece em mim e eu nele, esse dá muito fruto.” (Jo 15,5)",med:"Peçamos a graça de amar a Igreja, ser fiéis aos ensinamentos de Cristo e testemunhar o Evangelho.",ref:"A fé amadurece quando se torna comunhão, serviço e testemunho.",theme:"fides",motto:"FIDES",latin:"Manete in me.",left:"A fé cresce em comunhão.",right:"Permanecer em Cristo é dar fruto.",symbol:"✠",word:"FIDELIDADE"},
{title:"A Humildade e o Serviço",verse:"“Quem quiser ser o primeiro, seja o último de todos e o servo de todos.” (Mc 9,35)",med:"Que Santa Hildegarda nos ensine a colocar nossos dons a serviço dos outros, com humildade e amor.",ref:"O dom floresce plenamente quando se transforma em serviço.",theme:"humilitas",motto:"HUMILITAS",latin:"Servire in caritate.",left:"Servir dá forma concreta ao amor.",right:"Humildade é fazer do dom uma oferta.",symbol:"❀",word:"SERVIÇO"},
{title:"A Entrega Total a Deus",verse:"“Tudo vem de Ti, Senhor, e das Tuas mãos o recebemos.” (1Cr 29,14)",med:"Entreguemos nossa vida, família, necessidades e intenções ao Senhor, pela intercessão de Santa Hildegarda.",ref:"No último dia, a oração torna-se entrega: confiar o caminho inteiro às mãos de Deus.",theme:"oblatio",motto:"OBLATIO",latin:"Totum Deo.",left:"Tudo recebemos; tudo podemos oferecer.",right:"A jornada termina em confiança e gratidão.",symbol:"✥",word:"ENTREGA"}
];
let selected=1,deferredPrompt=null,sx=0,sy=0,homeSx=0,homeSy=0;
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
function formatDate(d){return new Date(d+"T12:00:00").toLocaleDateString("pt-BR")}
function endDate(){const s=load();const a=new Date((s.start||isoToday())+"T12:00:00");a.setDate(a.getDate()+8);return a.toLocaleDateString("pt-BR")}
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
  $("homeDayLabel").textContent="Dia "+n+" de 9";
  $("homeDots").innerHTML=days.map((_,i)=>'<span class="day-dot '+(s.done.includes(i+1)?"done":i+1===n?"active":"")+'"></span>').join("");
  if(r){
    const label=r.step==="initial"?"Oração inicial":r.step==="day"?"Reflexão do dia":"Oração final";
    status.hidden=false;
    status.textContent="Oração do Dia "+r.day+" em andamento · etapa "+stepNumber(r.step)+" de 3 — "+label;
    $("startPrayerBtn").innerHTML='<span>❦</span> Retomar oração do Dia '+r.day+' <b>›</b>';
  }else if(s.done.includes(n)){
    status.hidden=false;
    status.textContent="✓ Oração de hoje concluída · Deo gratias.";
    $("startPrayerBtn").innerHTML='<span>✓</span> Rever oração de hoje <b>›</b>';
  }else{
    status.hidden=true;
    $("startPrayerBtn").innerHTML='<span>🙏</span> Iniciar oração de hoje <b>›</b>';
  }
  updateRitualUI();
}
function renderDay(n){
  selected=Math.max(1,Math.min(9,n));
  const d=days[selected-1], page=$("bookPage");
  $("dayNo").textContent=selected+"º DIA";
  $("dayTitle").textContent=d.title;
  $("verse").textContent=d.verse;
  $("meditation").textContent=d.med;
  $("reflection").textContent=d.ref;
  $("dayArt").src=CLASSIC_IMAGES[selected-1];
  $("dayArt").alt="Arte do "+selected+"º dia — "+d.title;
  $("dayMotto").textContent=d.motto;
  $("dayLatin").textContent=d.latin;
  $("leftNote").textContent=d.left;
  $("rightNote").textContent=d.right;
  $("daySymbol").textContent=d.symbol;
  $("dayThemeWord").textContent=d.word;
  page.dataset.theme=d.theme;
  $("doneBtn").textContent=load().done.includes(selected)?"Rever conclusão com a oração final ›":"Concluir com a oração final ›";
}
function renderJourney(){const s=load();$("journeyList").innerHTML=days.map((d,i)=>`<button class="journey-row ${s.done.includes(i+1)?"done":""}" data-day="${i+1}"><span class="num">${i+1}</span><span class="meta"><strong>Dia ${i+1}</strong><small>${d.title}</small></span><span>›</span></button>`).join("");$("endDateLabel").textContent=endDate();document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{renderDay(+b.dataset.day);go("prayers")})}
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
$("saveIntention").onclick=()=>{const s=load();s.intention=$("intentionText").value.trim();save(s);$("intentionStatus").textContent="Intenção guardada neste aparelho."};
$("startDate").value=load().start||isoToday();
function reminderCalendarUrl(){
  const s=load(),start=(s.start||isoToday()).replaceAll("-","");
  const u=new URL("https://calendar.google.com/calendar/render");
  u.searchParams.set("action","TEMPLATE");
  u.searchParams.set("text","Santa Hildegarda — Hora da Novena");
  u.searchParams.set("dates",start+"T190000/"+start+"T193000");
  u.searchParams.set("ctz","America/Sao_Paulo");
  u.searchParams.set("recur","RRULE:FREQ=DAILY;COUNT=9");
  u.searchParams.set("details","São 19h. Comece pela Oração Inicial, siga a reflexão do dia e conclua com a Oração Final.\n\nAbrir a Novena Iluminada: https://joaofaustinojr.github.io/Faustino/medieval/");
  return u.toString();
}
function renderReminderStatus(){
  const s=load(),el=$("reminderStatus");
  if(!el)return;
  el.textContent=s.reminderOpened
    ?"Google Agenda preparado para 9 dias às 19h. Confirme o evento no calendário para concluir."
    :"O lembrete é criado no Google Agenda para funcionar mesmo com o app fechado.";
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
  if(ask&&confirm("Novena iniciada. Deseja preparar no Google Agenda um lembrete diário às 19h durante os nove dias?"))openReminderCalendar();
};
$("resetProgress").onclick=()=>{if(confirm("Reiniciar o progresso desta novena?")){const s=load();s.done=[];s.ritual=null;s.lastCompleted=null;s.start=$("startDate").value||isoToday();save(s);renderHome();renderJourney();renderDay(currentDay())}};
$("calendarBtn").onclick=openReminderCalendar;
$("shareBtn").onclick=()=>{const t="🌿 *Novena Digital de Santa Hildegarda de Bingen*\n\n9 dias de oração, reflexão, intenção e música.\nDeslize como as páginas de um livro.\n\n📖 https://joaofaustinojr.github.io/Faustino/medieval/share.html?v=6";window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank","noopener")};
function speechFriendly(text){return text.replace(/\((?:Sl|Jo|Mc|Fl|Pd|Cr|1Pd|1Cr|2Cr|Rm|Mt|Lc|At|Is|Gn|Ex)[^)]*\)/gi,"").replace(/\b(?:Sl|Jo|Mc|Fl|Pd|Cr|1Pd|1Cr|2Cr)\s*\d+[,:.]?\d*/gi,"").replace(/\s+/g," ").trim()}
function speak(text){if(!("speechSynthesis" in window)){alert("Leitura em voz alta não disponível neste navegador.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(speechFriendly(text));u.lang="pt-BR";u.rate=.88;const v=speechSynthesis.getVoices();u.voice=v.find(x=>x.lang?.toLowerCase().startsWith("pt-br"))||v.find(x=>x.lang?.toLowerCase().startsWith("pt"))||null;const m=$("music"),prev=!m.paused?m.volume:null;if(prev!==null)m.volume=.06;u.onend=u.onerror=()=>{if(prev!==null)m.volume=prev};speechSynthesis.speak(u)}
document.querySelectorAll(".speak").forEach(b=>b.onclick=()=>speak($(b.dataset.target).innerText));
$("speakDay").onclick=()=>{const d=days[selected-1];speak(d.title+". "+d.verse+" "+d.med+" "+d.ref)};
$("speakTraditional").onclick=()=>speak($("traditionalPrayerText").innerText.replace("Ouvir as orações completas",""));
const music=$("music"),dock=$("musicDock");music.volume=parseFloat($("volume").value);
$("musicQuick").onclick=()=>{dock.classList.add("show");toggleMusic()};
$("musicBtn").onclick=toggleMusic;$("volume").oninput=e=>music.volume=parseFloat(e.target.value);
async function toggleMusic(){dock.classList.add("show");if(music.paused){try{await music.play()}catch{alert("Toque novamente para iniciar a música.")}}else music.pause()}
music.onplaying=()=>{$("musicBtn").textContent="❚❚"};music.onpause=()=>{$("musicBtn").textContent="▶"};
function installButtons(){return [$("installHomeBtn"),$("installBtn")].filter(Boolean)}
function isStandalone(){return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone===true}
function setInstalledUI(){
  installButtons().forEach(b=>{b.textContent="✓ App instalado";b.disabled=true});
  const h=$("installHelp"); if(h){h.hidden=false;h.textContent="A Novena já está instalada neste aparelho."}
}
function showInstallHelp(){
  const h=$("installHelp"); if(!h)return;
  const ua=navigator.userAgent||"";
  const ios=/iPhone|iPad|iPod/i.test(ua);
  const android=/Android/i.test(ua);
  h.hidden=false;
  if(ios){
    h.textContent="No Safari: toque em Compartilhar e escolha “Adicionar à Tela de Início”.";
  }else if(android){
    h.textContent="No Chrome: toque no menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”.";
  }else{
    h.textContent="Abra o menu do navegador e procure “Instalar aplicativo” ou “Adicionar à tela inicial”.";
  }
}
async function requestInstall(){
  if(isStandalone()){setInstalledUI();return}
  if(deferredPrompt){
    deferredPrompt.prompt();
    const choice=await deferredPrompt.userChoice;
    if(choice && choice.outcome==="accepted"){
      installButtons().forEach(b=>{b.textContent="Instalando…";b.disabled=true});
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
  installButtons().forEach(b=>{b.disabled=false;b.textContent=b.id==="installBtn"?"⬇ Instalar no celular":"Instalar no celular"});
});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;setInstalledUI()});
installButtons().forEach(b=>b.onclick=requestInstall);
if(isStandalone())setInstalledUI();
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js?v=8").catch(()=>{});
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