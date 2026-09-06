const $=id=>document.getElementById(id);
const stateKey="hildegardaMedievalState";
const CLASSIC_IMAGES=Array.from({length:9},(_,i)=>`../assets/img/day${i+1}.jpg`);
const days=[
{title:"A Sabedoria de Deus",verse:"“O Senhor é minha luz e minha salvação.” (Sl 26,1)",med:"Que Santa Hildegarda nos obtenha a graça de buscar, acima de tudo, a Sabedoria que vem de Deus.",ref:"Peçamos um coração atento para reconhecer a presença de Deus nas escolhas de cada dia."},
{title:"A Luz que vence as trevas",verse:"“Vossa palavra é lâmpada para os meus pés e luz para o meu caminho.” (Sl 118,105)",med:"Peçamos o dom do discernimento, da fé e da clareza para seguir sempre a Luz de Cristo.",ref:"Onde a verdade e a caridade entram, as sombras perdem força."},
{title:"A Confiança na Providência Divina",verse:"“Lançai sobre o Senhor toda a vossa ansiedade, porque Ele tem cuidado de vós.” (1Pd 5,7)",med:"Entreguemos a Deus aquilo que não conseguimos controlar e descansemos em sua bondade.",ref:"Confiar é permanecer fiel mesmo quando ainda não vemos a resposta."},
{title:"A Cura Integral do Ser Humano",verse:"“Ele cura os corações quebrantados e cuida das suas feridas.” (Sl 147,3)",med:"Rezemos pela saúde do corpo, da mente e do espírito, e pela cura das feridas da alma.",ref:"A cura cristã alcança a pessoa inteira e a reconduz à esperança."},
{title:"A Força na Enfermidade e na Provação",verse:"“Posso todas as coisas naquele que me fortalece.” (Fl 4,13)",med:"Que Santa Hildegarda nos obtenha a graça de permanecer fiéis a Deus, mesmo nas cruzes e sofrimentos.",ref:"A fortaleza não elimina a fragilidade; faz-nos atravessá-la acompanhados por Deus."},
{title:"A Criação como Obra de Deus",verse:"“Quão numerosas são as vossas obras, Senhor! Fizestes tudo com sabedoria.” (Sl 103,24)",med:"Contemplemos a criação e bendigamos o Criador, reconhecendo Sua bondade em todas as criaturas.",ref:"Cuidar da criação é também aprender a recebê-la como dom."},
{title:"A Igreja e a Fidelidade à Fé",verse:"“Eu sou a videira, vós sois os ramos. Quem permanece em mim e eu nele, esse dá muito fruto.” (Jo 15,5)",med:"Peçamos a graça de amar a Igreja, ser fiéis aos ensinamentos de Cristo e testemunhar o Evangelho.",ref:"A fé amadurece quando se torna comunhão, serviço e testemunho."},
{title:"A Humildade e o Serviço",verse:"“Quem quiser ser o primeiro, seja o último de todos e o servo de todos.” (Mc 9,35)",med:"Que Santa Hildegarda nos ensine a colocar nossos dons a serviço dos outros, com humildade e amor.",ref:"O dom floresce plenamente quando se transforma em serviço."},
{title:"A Entrega Total a Deus",verse:"“Tudo vem de Ti, Senhor, e das Tuas mãos o recebemos.” (1Cr 29,14)",med:"Entreguemos nossa vida, família, necessidades e intenções ao Senhor, pela intercessão de Santa Hildegarda.",ref:"No último dia, a oração torna-se entrega: confiar o caminho inteiro às mãos de Deus."}
];
let selected=1,deferredPrompt=null,sx=0,sy=0;
function load(){try{return JSON.parse(localStorage.getItem(stateKey)||'{"start":"","done":[],"intention":""}')}catch{return{start:"",done:[],intention:""}}}
function save(s){localStorage.setItem(stateKey,JSON.stringify(s))}
function isoToday(){const d=new Date(),z=d.getTimezoneOffset()*60000;return new Date(d-z).toISOString().slice(0,10)}
function currentDay(){const s=load();if(!s.start)return 1;const a=new Date(s.start+"T00:00:00"),b=new Date();b.setHours(0,0,0,0);return Math.max(1,Math.min(9,Math.floor((b-a)/86400000)+1))}
function formatDate(d){return new Date(d+"T12:00:00").toLocaleDateString("pt-BR")}
function endDate(){const s=load();const a=new Date((s.start||isoToday())+"T12:00:00");a.setDate(a.getDate()+8);return a.toLocaleDateString("pt-BR")}
function renderHome(){const s=load(),n=currentDay();$("homeDayLabel").textContent="Dia "+n+" de 9";$("homeDots").innerHTML=days.map((_,i)=>'<span class="day-dot '+(s.done.includes(i+1)?"done":i+1===n?"active":"")+'"></span>').join("")}
function renderDay(n){selected=Math.max(1,Math.min(9,n));const d=days[selected-1];$("dayNo").textContent=selected+"º DIA";$("dayTitle").textContent=d.title;$("verse").textContent=d.verse;$("meditation").textContent=d.med;$("reflection").textContent=d.ref;$("dayArt").src=CLASSIC_IMAGES[selected-1];$("dayArt").alt="Arte do "+selected+"º dia";$("doneBtn").textContent=load().done.includes(selected)?"✓ Dia rezado":"Marcar dia como rezado"}
function renderJourney(){const s=load();$("journeyList").innerHTML=days.map((d,i)=>`<button class="journey-row ${s.done.includes(i+1)?"done":""}" data-day="${i+1}"><span class="num">${i+1}</span><span class="meta"><strong>Dia ${i+1}</strong><small>${d.title}</small></span><span>›</span></button>`).join("");$("endDateLabel").textContent=endDate();document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{renderDay(+b.dataset.day);go("prayers")})}
function go(name){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.go===name));if(name==="journey")renderJourney();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$("startPrayerBtn").onclick=()=>{renderDay(currentDay());go("prayers")};
$("prevDay").onclick=()=>turn(-1);$("nextDay").onclick=()=>turn(1);
function turn(dir){const n=Math.max(1,Math.min(9,selected+dir));if(n===selected)return;const p=$("bookPage");p.animate([{transform:"translateX(0)",opacity:1},{transform:`translateX(${dir>0?-30:30}px)`,opacity:.25}],{duration:180}).onfinish=()=>{renderDay(n);p.animate([{transform:`translateX(${dir>0?30:-30}px)`,opacity:.25},{transform:"translateX(0)",opacity:1}],{duration:180})}}
$("prayersView").addEventListener("touchstart",e=>{const t=e.changedTouches[0];sx=t.clientX;sy=t.clientY},{passive:true});
$("prayersView").addEventListener("touchend",e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)turn(dx<0?1:-1)},{passive:true});
$("doneBtn").onclick=()=>{const s=load();if(!s.done.includes(selected))s.done.push(selected);save(s);renderHome();renderDay(selected);renderJourney()};
$("intentionText").value=load().intention||"";
$("saveIntention").onclick=()=>{const s=load();s.intention=$("intentionText").value.trim();save(s);$("intentionStatus").textContent="Intenção guardada neste aparelho."};
$("startDate").value=load().start||isoToday();
$("saveStart").onclick=()=>{const s=load();s.start=$("startDate").value||isoToday();save(s);renderHome();renderJourney();$("startDate").value=s.start};
$("resetProgress").onclick=()=>{if(confirm("Reiniciar o progresso desta novena?")){const s=load();s.done=[];s.start=$("startDate").value||isoToday();save(s);renderHome();renderJourney();renderDay(currentDay())}};
$("calendarBtn").onclick=()=>{const s=load(),a=new Date((s.start||isoToday())+"T00:00:00"),e=new Date(a);e.setDate(e.getDate()+9);const f=d=>d.toISOString().slice(0,10).replaceAll("-","");const u=new URL("https://calendar.google.com/calendar/render");u.searchParams.set("action","TEMPLATE");u.searchParams.set("text","Novena Iluminada a Santa Hildegarda de Bingen");u.searchParams.set("dates",f(a)+"/"+f(e));u.searchParams.set("details","Nove dias de oração com Santa Hildegarda de Bingen.");window.open(u,"_blank","noopener")};
$("shareBtn").onclick=()=>{const t="🌿 *Novena Iluminada de Santa Hildegarda de Bingen*\n\n9 dias de oração, reflexão, intenção e música em estilo de manuscrito medieval.\n\n📖 https://joaofaustinojr.github.io/Faustino/medieval/";window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank","noopener")};
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
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").hidden=false});
$("installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").hidden=true}};
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
renderHome();renderDay(currentDay());renderJourney();
